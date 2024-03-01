import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { userRoleSelector } from "../../../../store/selectors";

export const FormSelect = ({ data, name, roleId, onChange, selectedItem }) => {
	const [isDisabled, setIsDisabled] = useState(false);
	const [isSearchable, setIsSearchable] = useState(true);

	const currentRoleId = useSelector(userRoleSelector);

	return (
		<Select
			className="react-select-container"
			classNamePrefix="react-select"
			styles={{
				control: (styles, state) => ({
					...styles,
					borderColor: state.isFocused ? "#2f82ff !important" : "#c7c7c7 !important",
					boxShadow: "none",
				}),
				dropdownIndicator: (styles, state) => ({
					...styles,
					color: state.isFocused ? "#2f82ff !important" : "#828282 !important",
				}),
				option: styles => {
					return {
						...styles,
						fontWeight: "500",
						cursor: "pointer",
					};
				},
			}}
			name={name}
			value={selectedItem}
			options={data.map(({ id, name }) => ({
				value: id,
				label: name,
			}))}
			onChange={onChange}
			components={{
				SingleValue: () => <div className="selectedItem">{selectedItem.name}</div>,
			}}
			isSearchable={!isSearchable}
			isDisabled={currentRoleId === roleId}
		/>
	);
};
