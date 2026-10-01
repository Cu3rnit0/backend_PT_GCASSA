const { getConnection, sql} = require ('../config/db');

const validarHacienda = ({ nombre, ubicacion, estatus }) => {
    const errores = [];

    if (typeof nombre !== 'string' || !nombre.trim()) errores.push('El nombre es obligatorio');
    else if (nombre.trim().length > 100) errores.push('El nombre no puede superar 100 caracteres');

    if (typeof ubicacion !== 'string' || !ubicacion.trim()) errores.push('La ubicación es obligatoria');
    else if (ubicacion.trim().length > 150) errores.push('La ubicación no puede superar 150 caracteres');

    if (estatus !== undefined && typeof estatus !== 'boolean') {
        errores.push('El estatus debe ser booleano (true = Activo, false = Inactivo)');
    }

    return errores;
};

const validarId = (valor) => {
    const id = Number(valor);
    return Number.isInteger(id) && id > 0 ? id : null;
};

//(GET)
const getHacinedas = async (req, res) =>{
    try{
        const pool = await getConnection();
        const result = await pool.request().query('select * from Haciendas');
        res.json(result.recordset);
    }catch(error){
        res.status(500).json({mensaje:'Error al obtener las haciendas',error:error.message});
    }    
};

//(POST)
const crearHacienda = async (req, res) => {
    const { nombre, ubicacion, estatus } = req.body;

    if (!nombre || !ubicacion) {
        return res.status(400).json({
            mensaje: 'Nombre y ubicación son obligatorios'
        });
    }

    try {
        const pool = await getConnection();

        await pool.request()
            .input('nombre', sql.NVarChar, nombre)
            .input('ubicacion', sql.NVarChar, ubicacion)
            .input('estatus',sql.Bit,estatus !== undefined ? estatus : 1)
            .query(`INSERT INTO Haciendas(nombre, ubicacion, estatus)VALUES(@nombre, @ubicacion, @estatus)`);

        res.status(201).json({mensaje: 'Hacienda creada exitosamente'});

    } catch (error) {
        res.status(500).json({mensaje: 'Error al crear la hacienda',error: error.message});
    }
};

//(DELETE)
const deleteHacienda = async (req, res) =>{
    const {id} = req.params;

    try{
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query('delete from Haciendas where id = @id');
        
        if (result.rowsAffected[0] === 0) return res.status(404).json({mensaje: 'Hacienda no encontrada'})
        
        res.json({mensaje: 'Hacienda eliminada exitosamente'})
    }catch (error){
        res.status(500).json({mensaje:'Error al eliminar', error: error.message});
    }
};

//(PUT)
const actualizarHacienda = async (req,res)=>{
    const { id } = req.params;
    const { nombre, ubicacion, estatus } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.NVarChar, nombre)
            .input('ubicacion', sql.NVarChar, ubicacion)
            .input('estatus', sql.Bit, estatus)
            .query('UPDATE Haciendas SET nombre = @nombre, ubicacion = @ubicacion, estatus = @estatus WHERE id = @id');
        
        if (result.rowsAffected[0] === 0) return res.status(404).json({ mensaje: 'Hacienda no encontrada' });
        
        res.json({ mensaje: 'Hacienda actualizada exitosamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

//(HU 4)
const contarHaciendas = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query('SELECT COUNT(*) AS total FROM Haciendas');
        res.json({ total: result.recordset[0].total });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al contar haciendas', error: error.message });
    }
};

module.exports = {getHacinedas, crearHacienda, deleteHacienda, actualizarHacienda, contarHaciendas}