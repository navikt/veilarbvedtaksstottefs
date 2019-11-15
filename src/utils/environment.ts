class Environment {
	get isAppMocked() {
		return process.env.REACT_APP_MOCK;
	}

	get isProduction() {
		return this.isAppMocked !== 'true';
	}

	get isDevelopment() {
		return this.isAppMocked === 'true';
	}

	get isRunningOnHeroku() {
		return window.location.hostname.endsWith('herokuapp.com');
	}
}

const env = new Environment();

export default env;
