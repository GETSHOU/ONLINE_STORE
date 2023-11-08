import { useState } from "react";
import Select from "react-select";

export const FormSelect = ({ roles, roleOnChange, selectedRoleId }) => {
	const [isSearchable, setIsSearchable] = useState(true);

	const selectedRole = roles.find(role => role.id === selectedRoleId);

	return (
		<Select
			className="select"
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
