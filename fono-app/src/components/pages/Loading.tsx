import React from 'react'

const htmlString = `
    <div>
        <style>
            .back-red {
                position: fixed;
                left: 0;
                top: 0;
                background: #DC0032;
                height: 100vh;
                width: 100vw;
            }

            .spinner {
                width: 100px;
                height: 100px;

                position: relative;
                margin: 100px auto;
                margin-top: 35vh;
            }

            .double-bounce1,
            .double-bounce2 {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background-color: #ddd;
                opacity: 0.6;
                position: absolute;
                top: 0;
                left: 0;

                -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
                animation: sk-bounce 2.0s infinite ease-in-out;
            }

            .double-bounce2 {
                -webkit-animation-delay: -1.0s;
                animation-delay: -1.0s;
            }

            @-webkit-keyframes sk-bounce {

                0%,
                100% {
                    -webkit-transform: scale(0.0)
                }

                50% {
                    -webkit-transform: scale(1.0)
                }
            }

            @keyframes sk-bounce {

                0%,
                100% {
                    transform: scale(0.0);
                    -webkit-transform: scale(0.0);
                }

                50% {
                    transform: scale(1.0);
                    -webkit-transform: scale(1.0);
                }
            }
        </style>

        <div class="back-red">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
        </div>
    </div>
`

export const Loading = React.createElement('div', { dangerouslySetInnerHTML: { __html: htmlString } })
