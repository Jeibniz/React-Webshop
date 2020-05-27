import React from 'react';

/**
 * Provides a reference to the placeholder images folder.
 */
const imagePath = require.context("placeholder_resources", true);

export default imagePath;