function setDonor(results) {
    results.forEach((result)=>{
        const donor = {};
        donor.name=result.donor.username;
        donor.institute=result.donor.institute;
        donor.donated = result.donor.donated.length;
        donor._id = result.donor._id;
        console.log(donor);
        result.donor = donor;
      });
    return results;
};

export default setDonor;