import { useEffect, useState } from "react";
import config from "../constant";
import Pagination from "./Pagination/Pagination";
import { getRecordIndex } from "../Utilities/PaginationUtilities";
import ProductList from "./ProductList";
import { processProductResponse } from "../Utilities/ProductUtilities";
import axios from "axios";



function Home({ refreshKey }) {
    const [products, setProduct] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getProducts();
    }, [refreshKey]);
    const getProducts = async () => {
        setLoading(true)
        await axios.get('http://localhost:8080/product/products')
            .then(function (response) {
                console.log(response);
                setProduct(processProductResponse(response.data));
                setLoading(false)
            })
            .catch(function (error) {
                console.log(error);
                setLoading(false)

            });
    }
    const index = getRecordIndex(page)
    return (
        <>
            <ProductList
                loading={loading}
                page={page}
                setPage={setPage}
                products={products
                    .filter((product) => product.show)
                    .slice(index, index + config.PAGE_SIZE)} />

            <div className=" mb-[80px] ">
                <Pagination
                    productLength={products.filter((product) => product.show).length}
                    page={page}
                    setPage={setPage}
                />
            </div>
        </>
    );
}

export default Home;
