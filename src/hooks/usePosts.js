import { useMemo } from "react";

// * SORT & MEMO STATE

// * Сортируем некие 2 объекта a и b (из массива posts), используя динамическое свойство,
// * которое являет собой строку запроса что хранится в sort
// * через localeCompare сравниваем, с каждым значением свойства поста в массиве
// * И всё это кешируется через useMemo

export const useSortedPosts = (posts, sort) => {
    const sortPosts = useMemo(() => {
        if (sort) return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]));

        return posts;
    }, [sort, posts]);

    return sortPosts;
};

export const usePosts = (posts, sort, query) => {
    const sortPosts = useSortedPosts(posts, sort);

    const sortAndSearchPosts = useMemo(() => {
        // * Case insensitive search uses only post title prop
        const pureQuery = query.toLowerCase();

        return sortPosts.filter((post) => post.title.toLowerCase().includes(pureQuery));
    }, [query, sortPosts]);

    return sortAndSearchPosts;
};
