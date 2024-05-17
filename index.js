const { Pool } = require("pg");

const config = {
    host : "localhost",
    port : 5432,
    database : "db_always_music",
    user : process.env.USER,
    password : process.env.PASS
};

const pool = new Pool(config);

const insertarEstudiante = async () =>
{
    const argumentos = process.argv.slice(2);

    let nombre = argumentos[0];
    let rut = argumentos[1];
    let curso = argumentos[2];
    let nivel = argumentos[3];

    const text = "INSERT INTO clientes(nombre, rut, curso, nivel) VALUES ($1, $2, $3, $4)";
    const values = [nombre, rut, curso, nivel];

    const response = await pool.query(text, values);
    console.log(`Estudiante ${nombre} fue agregado con exito`);

};

const buscarEstudiante = async () =>
{
    const argumento = process.argv.slice(2);

    let rut = argumento[0];

    const text = "SELECT * FROM clientes WHERE rut = $1";
    const values = [rut];

    const response = await pool.query(text, values);
    console.log(response.rows);
}

const buscarEstudiantes = async () =>
{
    const text = "SELECT * FROM clientes";

    const response = await pool.query(text);
    console.log(response.rows);
}

const actualizarEstudiante = async () =>
{
    const argumentos = process.argv.slice(2);

    let nombre = argumentos[0];
    let rut = argumentos[1];
    let curso = argumentos[2];
    let nivel = argumentos[3];

    const text = "UPDATE clientes SET nombre=$1, curso=$3, nivel=$4 WHERE rut = $2";
    const values = [nombre, rut, curso, nivel];

    const response = await pool.query(text, values);
    console.log(`Estudiante ${nombre} editado con exito`);
}

const eliminarEstudiante = async () =>
{
    const argumento = process.argv.slice(2);

    let rut = argumento[0];

    const text = "DELETE FROM clientes WHERE rut = $1";
    const values = [rut];
    const response = await pool.query(text, values);
    console.log(`Registro de estudiante con rut: ${rut} fue eliminado con exito`);
}


//insertarEstudiante();
//actualizarEstudiante();
//buscarEstudiante();
//eliminarEstudiante();
buscarEstudiantes();