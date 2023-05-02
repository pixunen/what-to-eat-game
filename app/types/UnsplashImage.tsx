export interface UnsplashImage {
    id: string,
    urls: {
        regular: string;
    };
    alt_description: string,
    width: number,
    height: number,
    clicked: boolean,
    score: number,
}