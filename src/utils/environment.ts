class Environment {
	get isProduction() {
		return !this.isDevelopment;
	}

	get isDevelopment() {
		return process.env.REACT_APP_DEV === 'true';
	}

	get isRunningOnHeroku() {
		return window.location.hostname.endsWith('herokuapp.com');
	}
}

const env = new Environment();

export default env;
