// import customFetch from './fetch'

// const baseUrl = 'http://localhost:3000/api/admin'
//получить все категории
// eslint-disable-next-line require-await

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export const apiAllTodo = async function() {
    await timeout(2000)
    const data = {
        data: [
            {
                _id: 'efw37rwuegf89fgwuef',
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                items: [
                    {
                        title: '0 Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: '1Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: '2 Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: '3 Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    }
                ]

            },
            {
                _id: 'efw37rwuegf89fgwuef',
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                items: [
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    }
                ]

            },
            {
                _id: 'efw37rwuegf89fgwuef',
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                items: [
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    }
                ]

            },
            {
                _id: 'efw37rwuegf89fgwuef',
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                items: [
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    }
                ]

            },
            {
                _id: 'efw37rwuegf89fgwuef',
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                items: [
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    }
                ]

            },
            {
                _id: 'efw37rwuegf89fgwuef',
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                items: [
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    },
                    {
                        title: 'Lorem ipsum dolor sit amet, consectetur',
                        isChecked: false
                    }
                ]

            }
        ]
    }
    return data

    // const [data] = await Promise.all([customFetch('get', `${baseUrl}/cats/`, null, token)])
    // return data
}
