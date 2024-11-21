import { OrNothing } from './type/ornothing';
import { EMDASH } from './index';

export const formateStringInUpperAndLowerCase = (str: OrNothing<string>) => {
	return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : EMDASH;
};
