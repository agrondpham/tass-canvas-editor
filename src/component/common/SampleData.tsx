export interface SampleFont {
    fontName: string, 
    fontFile: string
};
// export interface SampleImage {
//     data: string,
//     image: string
//     type: string
// };
// export interface SampleText {
//     data: string,
//     fontFamily: string,
//     fontSize: number,
//     fill: string,
//     type:string
// };
export interface TextItem {
    data: string,
    fontFamily: string,
    fontSize: number,
    fill: string,
    type: string
    editable: boolean
}
export interface ImageItem {
    data: string,
    image: string,
    type: string
}