const { getConnection, sql} = require ('../config/db');

//(GET)
const getHacinedas = async (req, res) =>{
    try{
        const pool = await getConnection();
        const result = await pool.request().query('select * from Haciendas');
        res.json(result.recorset);
    }catch(error){
        res.status(500).json({mensaje:'Error al obtener las haciendas',error:error.mensaje});
    }    
};

//(POST)
const crearHacienda = async (req, res) => {
    const { nombre, ubicacion, estatus } = req.body;

    if(!nombre || !ubicacion){
        return res.status(400).json({mensaje: 'Nombre y ubicacion son obligatorios'});
    }
    try{
        const pool = await getConnection();
        await pool.request()
            .input('nombre',sql.NVarChar,nombre)
            .input('ubicacion',sql.NVarChar,ubicacion)
            .input('estatus',sql.Bit,estatus !==undefined ? estatus :1)
            .input('insert into Haciendas (nombre,ubicacion,estatus)values(@nombre, @ubicacion, @estatus)');
        res.estatus(201).json({mensaje:'Hacienda creada exitosamente'});
    }catch(error){
        res.status(500).json({mensaje: 'Error al crear la hacienda', error: error.mensaje});
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
        res.status(500).json({mensaje:'Error al eliminar', error: error.mensaje});
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



module.exports = {getHacinedas, crearHacienda, deleteHacienda, actualizarHacienda}