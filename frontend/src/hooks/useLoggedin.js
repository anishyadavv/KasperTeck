const useLoggedin = ()=>{
    if(localStorage.getItem('token'))
        return true;
    return false;
}
export default useLoggedin;