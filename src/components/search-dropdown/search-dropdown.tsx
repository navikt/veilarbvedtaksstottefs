import React from 'react';
import Select from 'react-select';
import './search-dropdown.less';

interface SearchDropdownProps {
	id: string;
	label: string;
	placeholder: string;
	options: DropdownOption[];
	onChange?: (selectedOption: DropdownOption | null) => void;
}

export interface DropdownOption {
	value: string;
	label: string;
}

export const SearchDropdown = (props: SearchDropdownProps) => {
	const {id, label, placeholder, options, onChange} = props;

	return (
		<div className="veilarbvedtaksstottefs-search-dropdown">
			<label htmlFor={id} className="skjemaelement__label">{label}</label>
			<Select
				name={id}
				placeholder={placeholder}
				isClearable
				isSearchable
				classNamePrefix="search-dropdown"
				clearValueText="Fjern verdi"
				noResultsText="Listen er tom"
				searchPromptText="Skriv inn for å søke"
				options={options}
				onChange={onChange as any}
			/>
		</div>
	);
};
