import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { debounce } from "../../../utils";
import styles from "./SearchInput.module.scss";

export const SearchInput = ({
	searchQuery,
	shouldSearch,
	setSearchQuery,
	setShouldSearch,
	setSearchCompleted,
}) => {
	const navigate = useNavigate();
	const searchInputRef = useRef(null);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 1500), []);

	useEffect(() => {
		if (shouldSearch) {
			if (searchQuery !== "") {
				navigate(`/products?search=${searchQuery}`);

				setShouldSearch(false);
				setSearchCompleted(false);

				searchInputRef.current.blur();
			} else {
				setShouldSearch(false);
			}
		}
	}, [navigate, shouldSearch, searchQuery]);

	const onSearch = ({ target }) => {
		startDelayedSearch(!shouldSearch);
		setSearchQuery(target.value);
	};

	return (
		<div className={styles.wrapper}>
			<input
				ref={searchInputRef}
				type="text"
				value={searchQuery}
				onChange={onSearch}
				className={styles.input}
				placeholder="Введите название товара"
			/>
			<BiSearch className="icon iconSearch centeredY" />
		</div>
	);
};
