const calculateDateDifference = (date) => {
    
    var dateNow = new Date();
    var datePosted = new Date(date);

    const diffTime = Math.abs(dateNow - datePosted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffTime + " milliseconds");
    console.log(diffDays + " days");

    return diffTime;
}