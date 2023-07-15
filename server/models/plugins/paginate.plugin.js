const paginate = (schema) =>{
    schema.statics.paginate = async function(filter,options)
    {
        let sorting=[];
        let sortingCriteria = [];
        let sort ='';
        if(options.sortBy)
        {
            sorting=options.sortBy.split(',');
            sorting.forEach((val)=>{
                let [key,order] = val.split(':');
                order = order.trim();
                key = key.trim();
                sortingCriteria.push((order === 'asc' ? '' : '-')+key);
            });
            sort=sortingCriteria.join(' ');
        }
        else sort='createdAt';

        let limit,skip,page,totalResults,populate;
        limit = parseInt(options.limit,10) || 11 ; //results per page
        page = parseInt(options.page,10) || 1 ; //no of pages which match the filter
        skip = (page-1)*limit;
        const count = this.countDocuments(filter);
        const documents = this.find(filter).sort(sort).skip(skip).limit(limit);

        if(options.populate && options.populate !== {})
        {
            documents.populate(options.populate); //isko sambhal, isme kuch bhi pass nhi kr sakta (also query wale ko sanitize krna bhul mat, warna injection lagega)
        }
        if(options.lean && options.lean === true)
        {
            documents.lean();
        }
        return Promise.all([count,documents])
                      .then((value) => {
           const [totalResults,results]=value;
           const totalPages = Math.ceil(totalResults/limit);
           const result = {
                results,
                limit,
                page,
                totalPages,
                totalResults,
           }
           return Promise.resolve(result);
        }); //yaha pe directly getPageRes laga sakte, par usse error handling (like with empty results) me problem ayegi
    };
};

module.exports = paginate;

//paginate will give us help us with, options in find queries like,
//1. limit
//2. skip
//3. page
//4. sortBy
//5. populate
//this all the options, can be passed inside the pagination plugin.

//parmas
// sortBy : 'mobile:desc,rollno:aesc' yaha pe desc h,instead of -1, since ig query me pass krenge no to problem hosakti h.
