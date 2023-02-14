import { getTotalPages } from "../../Utilities/PaginationUtilities";
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleDoubleRight, FaAngleRight } from 'react-icons/fa';
import styles from "./Pagination.module.css";

const Pagination = (props) => {
    const { productLength, setPage, page } = props;

    const totalPages = getTotalPages(productLength);
    const changePage = (index) => {
        setPage(index);
    };

    const navigatePage = (index) => {
        if (index < 1) {
            index = 1;
        } else if (index > totalPages) {
            index = totalPages;
        }
        setPage(index);
    };

    let pages = [];
    pages.push(
        <div
            key={-3}
            className={`${styles.page} ${page === 1 ? styles.disabled : ""}`}
            onClick={() => changePage(1)}
        >
            < FaAngleDoubleLeft />
        </div>
    );
    pages.push(
        <div
            key={-2}
            className={`${styles.page} ${page === 1 ? styles.disabled : ""}`}
            onClick={() => navigatePage(page - 1)}
        >
            <FaAngleLeft />
        </div>
    );
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <div
                key={i}
                onClick={() => changePage(i)}
                className={`${styles.page} ${page === i ? styles.selected : ""}`}
            >
                {i}
            </div>
        );
    }
    pages.push(
        <div
            key={-1}
            className={`${styles.page} ${page === totalPages ? styles.disabled : ""}`}
            onClick={() => navigatePage(page + 1)}
        >
            <FaAngleRight />

        </div>
    );
    pages.push(
        <div
            key={0}
            className={`${styles.page} ${page === totalPages ? styles.disabled : ""}`}
            onClick={() => changePage(totalPages)}
        >
            <FaAngleDoubleRight />
        </div>
    );

    return (
        <div className={styles.pagination}>{pages}</div>
    );
};

export default Pagination;
