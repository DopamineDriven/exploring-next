import React from 'react';
import App, {Container} from 'next/app';
import {Layout} from "../src/Layout";
// https://nextjs.org/docs/basic-features/built-in-css-support
// remove container from app -> deprecated
// https://github.com/zeit/next.js/blob/master/errors/app-container-deprecated.md


export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return (
                <Layout>
                    <Component {...pageProps} />
                </Layout>
        );
    }
}