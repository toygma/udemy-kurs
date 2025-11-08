export interface DropdownItem {
    name:string;
    link:string;
}


export interface headerData {
    id:number;
    title:string;
    href:string;
    dropdown?:DropdownItem[] | undefined;
}


