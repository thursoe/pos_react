import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error, errorInfo) {
    console.log("error is ", error);
    console.log("error info is  ", errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <>
          <div className="flex flex-col  mt-40 items-center justify-center">
            <div className=" text-red-600 font-serif  text-3xl">
              Something is not right , Pls Back the main page
            </div>
            <a
              href="/"
              className="px-4 hover:bg-red-400 py-2 mt-10 bg-red-500 text-white rounded-sm w-40"
            >
              Go to Main Page
            </a>
          </div>
        </>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
