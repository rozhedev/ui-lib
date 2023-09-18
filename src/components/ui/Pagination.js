import Btn from "./Btn";
import btnStyles from './Btn.module.css'
import pagStyles from "./Pagination.module.css";

const Pagination = ({ pagesArr, postPage, setPostPage }) => {

    return (
        <div className={pagStyles.PaginationContainer}>
            {pagesArr.map((page, index) => (
                <Btn
                    key={index}
                    onClick={(e) => {
                        setPostPage(page);
                    }}
                    // * If postPage, saved current page element, matches with number for pageArr (necessary for pag render) => choose styles
                    className={postPage === page ? btnStyles.Btn : btnStyles.PaginationBtnActive}
                >
                    {page}
                </Btn>
            ))}
        </div>
    );
};

export default Pagination;
