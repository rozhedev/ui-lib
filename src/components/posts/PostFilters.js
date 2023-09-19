import styles from "./PostFilters.module.css";
import inpStyles from "../ui/Inp.module.css";
import Inp from "../ui/Inp";
import Select from "../ui/Select";
import Btn from "../ui/Btn";

const PostFilters = ({ filters, setFilters, ...props }) => {
    return (
        <div className={styles.PostFilters}>
            <div>
                <Inp
                    className={`${inpStyles.Inp} ${inpStyles.InpSmall}`}
                    placeholder="Поиск постов"
                    value={filters.query}
                    onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                />
                <Btn
                    type="submit"
                    onClick={() => setFilters({ ...filters, query: "" })}
                >
                    Clear query
                </Btn>
            </div>

            <Select
                id="select-sort"
                value={filters.sort}
                onChange={(selectedSort) => setFilters({ ...filters, sort: selectedSort })}
                defaultValue="Сортировка по"
                
                // * value prop must be same with prop name "newPost" 
                // * object from PostForm
                options={[
                    {
                        label: "По заголовку",
                        value: "title",
                    },
                    {
                        label: "По контенту",
                        value: "body",
                    },
                    {
                        label: "По ID",
                        value: "id",
                    },
                ]}
            />
        </div>
    );
};

export default PostFilters;
