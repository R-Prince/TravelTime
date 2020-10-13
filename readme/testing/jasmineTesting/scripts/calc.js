// Assign custom marker to google map place depending on "type"
function getIcon(type){
    switch (type){
        case "lodging":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/897/897061.svg";
        

        case "restaurant":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/3556/3556680.svg"; 
        

        case "bar":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/761/761767.svg"; 
        

        case "spa":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/2751/2751542.svg"; 
        

        case "night_club":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/3093/3093998.svg"; 
        
        case "shopping_mall":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/831/831209.svg";
        

        case "point_of_interest":
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/883/883746.svg";
        

        default:
        return urlIcon = "https://www.flaticon.com/svg/static/icons/svg/944/944551.svg";
    }
}
