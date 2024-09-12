import axios from "../utils/axiosCustomize";


const postCreateNewUser = (email, password, username, role, image) => {
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('api/v1/participant', data);
}

const putUpdateUser = (id, username, role, image) => {
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('api/v1/participant', data);
}

const getAllTableUsers = () => {
    return axios.get('api/v1/participant/all');
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}

const getUserPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const getQuizByUser = () => {
    return axios.get('api/v1/quiz-by-participant')
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 3000 });
}

const postRegister = (email, password, username) => {
    return axios.post('api/v1/register', { email, password, username });
}

const getDetailQuestionId = (id) => {
    return axios.get(`api/v1/questions-by-quiz?quizId=${id}`)

}

const postFinishQuiz = (data) => {
    return axios.post('api/v1/quiz-submit', { ...data });
}

const postAddNewQuiz = (description, name, difficulty, image) => {
    const data = new FormData();
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);
    return axios.post('api/v1/quiz', data)
}

const getAllQuizForAdmin = () => {
    return axios.get('api/v1/quiz/all');
}

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
    const data = new FormData();
    data.append('id', id);
    data.append('description', description);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', quizImage);
    return axios.put('api/v1/quiz', data);
}

const deleteQuiz = (quizId) => {
    return axios.delete(`api/v1/quiz/${quizId}`);
}

const postAddNewQuestion = (quizId, description, image) => {
    const data = new FormData();
    data.append('quiz_id', quizId);
    data.append('description', description);
    data.append('questionImage', image);
    return axios.post('api/v1/question', data)
}

const postAddNewAnswer = (description, correct_answer, question_id) => {
    return axios.post('api/v1/answer', { description, correct_answer, question_id })
}

const postAssignQuiz = (quizId, userId) => {
    return axios.post('api/v1/quiz-assign-to-user', { quizId, userId })
}

const getQuizWithQA = (quizId) => {
    return axios.get(`api/v1/quiz-with-qa/${quizId}`)
}

const postUpsertQuiz = (data) => {
    return axios.post('api/v1/quiz-upsert-qa', { ...data });
}

const postLogOut = (email, refresh_token) => {
    return axios.post('api/v1/logout', { email, refresh_token })
}

export {
    postCreateNewUser, getAllTableUsers, putUpdateUser, deleteUser,
    getUserPaginate, postLogin, postRegister, getQuizByUser,
    getDetailQuestionId, postFinishQuiz, postAddNewQuiz, getAllQuizForAdmin,
    putUpdateQuiz, deleteQuiz, postAddNewQuestion, postAddNewAnswer,
    postAssignQuiz, getQuizWithQA, postUpsertQuiz, postLogOut
}