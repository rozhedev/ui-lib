import { useState } from "react";

const usePagination = (page = 0, limit = 10, slidePage = 1) => {

    // * before async fetching, totalPagesCount = 0 
    const [totalPagesCount, setTotalPagesCount] = useState(page);
    const [postsLimit, setPostsLimit] = useState(limit);
    const [postPage, setPostPage] = useState(slidePage);

    let pagesArr = [];
    for (let i = 0; i < totalPagesCount; i++) {
        pagesArr.push(i + 1);
    }
    return [pagesArr, setTotalPagesCount, postsLimit, postPage, setPostPage];
};

export default usePagination;
