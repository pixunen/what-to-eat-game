const fakeData = [
    {
        id: 1,
        name: 'Item 1',
        imgURL: 'https://example.com/item1.jpg',
    },
    {
        id: 2,
        name: 'Item 2',
        imgURL: 'https://example.com/item2.jpg',
    },
    {
        id: 3,
        name: 'Item 3',
        imgURL: 'https://example.com/item3.jpg',
    },
];

export const getData = async (): Promise<Array<{ id: number; name: string; imgURL: string }>> => {
    return fakeData;
};