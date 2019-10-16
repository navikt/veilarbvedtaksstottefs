import React from 'react';
import cls from 'classnames';
import SkjemaelementFeilmelding from 'nav-frontend-skjema/lib/skjemaelement-feilmelding';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { MONTHS, WEEKDAYS_LONG, WEEKDAYS_SHORT } from './localization-nb';
import { formatDate } from '../../utils/date-utils';
import 'react-day-picker/lib/style.css';
import './datepicker.less';
import calendarIcon from './calendar.svg';

interface DatepickerProps {
	id: string;
	label: string;
	value: Date | undefined;
	onDateChange: (date: Date) => void;
	error?: string;
	alignRight?: boolean;
}

export const Datepicker = (props: DatepickerProps) => {
	const {label, value, error, id, onDateChange, alignRight} = props;
	const classNames = {
		container: 'DayPickerInput',
		overlay: cls(
			'DayPickerInput-Overlay',
			'datepicker__overlay',
			{'datepicker__overlay--align-right': alignRight}
		),
		overlayWrapper: `DayPickerInput-OverlayWrapper`
	};
	return (
		<div className="vedtaksstotte-datepicker skjemaelement">
			<label htmlFor={id} className="skjemaelement__label">{label}</label>
			<img src={calendarIcon} className="vedtaksstotte-datepicker__icon" alt="Kalender" />
			<DayPickerInput
				inputProps={{
					id,
					name: id,
					placeholder: 'dd.mm.åååå',
					className: 'vedtaksstotte-datepicker__input skjemaelement__input'
				}}
				dayPickerProps={{
					months: MONTHS,
					weekdaysLong: WEEKDAYS_LONG,
					weekdaysShort: WEEKDAYS_SHORT,
					firstDayOfWeek: 1
				}}
				value={value}
				onDayChange={onDateChange}
				format="DD.MM.YYYY"
				formatDate={formatDate}
				classNames={classNames}
			/>
			<SkjemaelementFeilmelding feil={error ? {feilmelding: error} : undefined}/>
		</div>
	);
};
