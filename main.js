// AXIOS GLOBALS    
axios.defaults.headers.common['X-Auth-Token'] = 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

// GET REQUEST
function getTodos() {
    console.log('GET Request');

    // version #1
    // axios({
    //     method: 'get',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     params: {_limit: 5}
    // }).then(response => {
    //     console.log(response);

    //     showOutput(response);
    // }).catch(error => console.error(error));

    // version #2
    let numberOfPosts = 5;

    axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${numberOfPosts}`, {timeout: 3000})
         .then(response => {
                console.log(response);
            
                showOutput(response);
         }).catch(error => console.error(error));
};
  
// POST REQUEST
function addTodo() {
    console.log('POST Request');

    // version #1
    // axios({
    //     method: 'post',
    //     url: 'https://jsonplaceholder.typicode.com/todos',
    //     data: {title: 'New Todo', completed: false}
    // }).then(response => {
    //     console.log(response);

    //     showOutput(response);
    // }).catch(error => console.log(error));

    // version #2
    axios.post('https://jsonplaceholder.typicode.com/todos', {title: 'New Todo', completed: false})
         .then(response => {
            console.log(response);

            showOutput(response);
         }).catch(error => console.log(error));
};
  
// PUT/PATCH REQUEST
function updateTodo() {
    console.log('PUT/PATCH Request');

    let id = 1;

    // put requests replace the entire resource
    // axios.put(`https://jsonplaceholder.typicode.com/todos/${id}`, {title: 'Updated Todo', completed: true})
    //      .then(response => {
    //         console.log(response);

    //         showOutput(response);
    //      }).catch(error => console.log(error));

    // patch requests update the resource partly
    axios.patch(`https://jsonplaceholder.typicode.com/todos/${id}`, {title: 'Updated Todo', completed: true})
         .then(response => {
            console.log(response);

            showOutput(response);
         }).catch(error => console.log(error));
};
  
// DELETE REQUEST
function removeTodo() {
    console.log('DELETE Request');

    let id = 2;

    axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
         .then(response => {
            console.log(response);

            showOutput(response);
         }).catch(error => console.log(error));
};
  
// SIMULTANEOUS DATA
function getData() {
    console.log('Simultaneous Requests');

    const resources = ['todos', 'posts'];

    let quantity = 5;

    // version #1
    // axios.all([
    //     axios.get(`https://jsonplaceholder.typicode.com/${resources[0]}?_limit=${quantity}`),
    //     axios.get(`https://jsonplaceholder.typicode.com/${resources[1]}?_limit=${quantity}`)
    // ]).then(response => {
    //     console.log(response[0]);

    //     console.log(response[1]);

    //     showOutput(response[0]);
    // }).catch(error => console.log(error));

    // version #2
    axios.all([
        axios.get(`https://jsonplaceholder.typicode.com/${resources[0]}?_limit=${quantity}`),
        axios.get(`https://jsonplaceholder.typicode.com/${resources[1]}?_limit=${quantity}`)
    ]).then(axios.spread((todos, posts) => showOutput(posts)))
      .catch(error => console.log(error));
};
  
// CUSTOM HEADERS
function customHeaders() {
    console.log('Custom Headers');

    const config = {
        headers: {'content-type': 'application/json', Authorization: 'some-jwt-token'}
    };

    // you have to log in to create a post
    axios.post('https://jsonplaceholder.typicode.com/todos', {title: 'New Todo', completed: false}, config)
         .then(response => showOutput(response))
         .catch(error => console.log(error));
};
  
// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
    console.log('Transform Response');

    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typicode.com/todos',
        data: {title: 'Bonsoir Elliot'},
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUpperCase();

            return data;
        })
    };

    axios(options).then(response => showOutput(response)).catch(error => console.log(error));
};
  
// ERROR HANDLING
function errorHandling() {
    console.log('Error Handling');

    let numberOfPosts = 5;

    axios.get(`https://jsonplaceholder.typicode.com/todoss?_limit=${numberOfPosts}`, {validateStatus: status => status < 500})
         .then(response => showOutput(response))
         .catch(error => {
            if(error.response) {
                // server responded with a status other than the 200 range
                console.log(error.response.data);

                console.log(error.response.status);

                console.log(error.response.headers);
            }else if(error.request) {
                // a request was made but no response
                console.error(error.request);
            }else {
                console.error(error.message);
            }
         });
};
  
// CANCEL TOKEN
function cancelToken() {
    console.log('Cancel Tokens');

    const source = axios.CancelToken.source();

    let numberOfPosts = 5;

    axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${numberOfPosts}`, {cancelToken: source.token})
         .then(response => showOutput(response))
         .catch(thrown => {if(axios.isCancel(thrown)) console.log(thrown.message);});

    if(true) source.cancel('Request Cancelled!');
};
  
// INTERCEPTING REQUESTS & RESPONSES
axios.interceptors.request.use(config => {
    console.log(`${config.method.toUpperCase()} request sent to ${config.url} at ${new Date().getTime()}`);

    return config;
}, error => Promise.reject(error));

// AXIOS INSTANCES
const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com'
});

// axiosInstance.get('/comments?_limit=5')
//              .then(response => showOutput(response))
//              .catch(error => {if(error.response) console.log(error.response.data, error.response.status, error.response.headers);});
  
// Show output in browser
function showOutput(response) {document.getElementById('response').innerHTML = `<div class="card card-body mb-4">
                                                                                    <h5>Status: ${response.status}</h5>
                                                                                </div>

                                                                                <div class="card mt-3">
                                                                                    <div class="card-header">Headers</div>
                                                                                    <div class="card-body">
                                                                                        <pre>${JSON.stringify(response.headers, null, 2)}</pre>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="card mt-3">
                                                                                    <div class="card-header">Data</div>
                                                                                    <div class="card-body">
                                                                                        <pre>${JSON.stringify(response.data, null, 2)}</pre>
                                                                                    </div>
                                                                                </div>

                                                                                <div class="card mt-3">
                                                                                    <div class="card-header">Config</div>
                                                                                    <div class="card-body">
                                                                                        <pre>${JSON.stringify(response.config, null, 2)}</pre>
                                                                                    </div>
                                                                                </div>`;
};
  
// Event listeners
document.getElementById('get').addEventListener('click', getTodos);

document.getElementById('post').addEventListener('click', addTodo);
  
document.getElementById('update').addEventListener('click', updateTodo);
  
document.getElementById('delete').addEventListener('click', removeTodo);
  
document.getElementById('sim').addEventListener('click', getData);
  
document.getElementById('headers').addEventListener('click', customHeaders);
  
document.getElementById('transform').addEventListener('click', transformResponse);
  
document.getElementById('error').addEventListener('click', errorHandling);
  
document.getElementById('cancel').addEventListener('click', cancelToken);