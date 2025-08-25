class Environment {
	get isDemo() {
		return import.meta.env.MODE === 'demo';
	}

	get erITestMiljo() {
		return (
			window.location.hostname.split('.').findIndex(domain => ['app-q1', 'app-q0', 'dev'].includes(domain)) >= 0
		);
	}

	get isRunningOnGhPages() {
		return window.location.hostname === 'navikt.github.io';
	}
}

const env = new Environment();

export default env;
