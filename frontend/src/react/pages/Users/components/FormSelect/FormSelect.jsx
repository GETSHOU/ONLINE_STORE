import { useState } from "react";
import Select from "react-select";

export const FormSelect = ({ roles, roleOnChange, selectedRoleId }) => {
	const [isSearchable, setIsSearchable] = useState(true);

	const selectedRole = roles.find(role => role.id === selectedRoleId);

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
			isSearchable={!isSearchable}
			name="roles"
			value={selectedRole}
			onChange={roleOnChange}
			options={roles.map(({ id: userRoleId, name: roleName }) => ({
				value: userRoleId,
				label: roleName,
			}))}
			components={{
				SingleValue: () => <div className="selectedRole">{selectedRole.name}</div>,
			}}
		/>
	);
};
