export type Categories = {
    _id: string;
    _type: "categories";
    title?: string;
    image?: {
        asset?: {
            _ref: string;
            _type: "reference";
            _weak?: boolean;
        };
        
        _type: "image";
    };
    products?: number;
};
