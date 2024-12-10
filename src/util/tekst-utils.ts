import { OrNothing } from './type/ornothing';

export const formateStringInUpperAndLowerCase = (str: OrNothing<string>) => {
	return str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';
};
