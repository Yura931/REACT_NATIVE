// API로 부터 받은 이미지를 입력하는 함수
export const makeImgPath = (img:string, width:string = "w500") =>
`https://image.tmdb.org/t/p/${width}${img}`;
