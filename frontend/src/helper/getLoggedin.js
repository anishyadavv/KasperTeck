const getLoggedin = ()=>{
    if(localStorage.getItem('token')){
        return true;
    }
    return false;
}
export default getLoggedin;