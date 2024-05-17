const { Pool } = require("pg");

const config = {
    host : "localhost",
    port : 5432,
    database : "db_always_music",
    user : process.env.USER,
    password : process.env.PASS
};

const pool = new Pool(config);

//Insertar Estudiante ej: 'Maria Pizarro' '20.321.654-8' 'Trombon' 5
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

//Buscar Estudiante por RUT ej: '20.321.654-8'
const buscarEstudiante = async () =>
{
    const argumento = process.argv.slice(2);

    let rut = argumento[0];

    const text = "SELECT * FROM clientes WHERE rut = $1";
    const values = [rut];

    const response = await pool.query(text, values);
    console.log(response.rows);
}

//Buscar Todos los Estudiantes En base de datos
const buscarEstudiantes = async () =>
{
    const text = "SELECT * FROM clientes";

    const response = await pool.query(text);
    console.log(response.rows);
}

//Actualizar Estudiante ej: 'Maria Pizarro' '20.321.654-8' 'Flauta' 5 1
const actualizarEstudiante = async () =>
{
    const argumentos = process.argv.slice(2);

    let nombre = argumentos[0];
    let rut = argumentos[1];
    let curso = argumentos[2];
    let nivel = argumentos[3];
    let id = argumentos[4];

    const text = "UPDATE clientes SET nombre=$1, rut = $2, curso=$3, nivel=$4 WHERE id = $5";
    const values = [nombre, rut, curso, nivel, id];

    const response = await pool.query(text, values);
    console.log(`Estudiante ${nombre} editado con exito`);
}

//Eliminar Estudiante ej: '20.321.654-8'
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