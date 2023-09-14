import styles from "./PostFilters.module.css";
import inpStyles from '../ui/Inp.module.css'
import Inp from '../ui/Inp';
import Select from '../ui/Select';

const PostFilters = ({ filters, setFilters, ...props }) => {

    return (
        <div className={styles.PostFilters}>
            <Inp
                className={`${inpStyles.Inp} sort-widget__inp`}
                placeholder="Поиск постов"
                value={filters.query}
                onChange={(e) => setFilters({ ...filters, query: e.target.value })}
            />

            <Select
                id="select-sort"
                value={filters.sort}
                onChange={selectedSort => setFilters({ ...filters, sort: selectedSort })}
                defaultValue="Сортировка по"
                
                // * значение свойства value должно совпадать
                // * с именем свойства объекта newPost из PostForm
                options={[
                    {
                        label: "По заголовку",
                        value: "title",
                    },
                    {
                        label: "По контенту",
                        value: "content",
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
