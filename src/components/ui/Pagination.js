import { v4 as uuidv4 } from "uuid";

import Btn from "./Btn";
import btnStyles from "./Btn.module.css";
import pagStyles from "./Pagination.module.css";

const Pagination = ({ pagesArr, postPage, setPostPage }) => {
    return (
        <div className={pagStyles.PaginationContainer}>
            <Btn
                key={uuidv4()}
                className={postPage > 1 ? btnStyles.Btn : btnStyles.BtnDisabled}
                onClick={() => {
                    postPage > 1 && setPostPage(postPage - 1);
                }}
            >
                &#9668;
            </Btn>
            {pagesArr.map((page) => (
                <Btn
                    key={uuidv4()}
                    onClick={(e) => {
                        setPostPage(page);
                    }}
                    // * If postPage, saved current page element, matches with number for pageArr (necessary for pag render) => choose styles
                    className={postPage === page ? btnStyles.Btn : btnStyles.PaginationBtnActive}
                >
                    {page}
                </Btn>
            ))}
            <Btn
                key={uuidv4()}
                className={postPage < pagesArr.at(-1) ? btnStyles.Btn : btnStyles.BtnDisabled}
                onClick={() => {
                    postPage < pagesArr.at(-1) && setPostPage(postPage + 1);
                }}
            >
                &#9658;
            </Btn>
        </div>
    );
};

export default Pagination;
