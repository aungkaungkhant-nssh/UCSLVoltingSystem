export const avatarName = (name)=>{
    const nameArray = name.split(" ");
    return nameArray.length > 1 ? nameArray[0][0]+nameArray[nameArray.length-1][0] : nameArray[0][0]
}