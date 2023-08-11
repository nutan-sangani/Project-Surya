function setDonor(results) {
    results.forEach((result)=>{
        const donor = {};
        donor.name=result.donor.username;
        donor.institute=result.donor.institute;
        donor.donated = result.donor.donated;
        donor._id = result.donor._id;
        result.donor = donor;
      });
    return results;
};

export default setDonor;