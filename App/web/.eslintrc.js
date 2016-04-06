module.exports = {
    "extends": "google",
    "plugins": [
        "react"
    ],
    "settings": {
        "react": {
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "0.14.0" // React version, default to the latest React stable release
        }
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        }
    }
};