import React, { useState } from 'react';
import { Button } from 'antd';
import { IErroFonologico } from '../../../types/erroFonologico';
import { deleteErroFonologico } from '../../../services/ErroFonologico';
import { useErroFonologico } from '../../../store/ErroFonologico';
import { DraggableModal } from '../DraggableModal';

interface UIModalUpdateErroFonologico {
    open: boolean
    setOpen: Function
    erroFonologico: IErroFonologico
}


export const DeleteErroModal: React.FC<UIModalUpdateErroFonologico> = (
    {
        open,
        setOpen,
        erroFonologico
    }
) => {
    const [loading, setLoading] = useState(false);
    const { refreshListOfErroFonologico } = useErroFonologico()

    const handleCancel = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        setLoading(true);
        const res = await deleteErroFonologico(erroFonologico.id)
        setLoading(false)
        if (res) {
            refreshListOfErroFonologico()
            setOpen(false)
        }
    }

    return (
        <DraggableModal
            open={open}
            setOpen={setOpen}
            props={{
                title: 'Apagar Erro Fonológico',
                footer: [
                    <Button key="back" onClick={() => { handleCancel() }}>
                        Cancelar
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={() => handleDelete()}>
                        Confirmar
                    </Button>
                ]
            }}
            // onOk={()=>handleUpdate(values)}
            onCancel={handleCancel}
        >
            <p>Tem certeza que deseja excluir este registro?</p>
        </DraggableModal>
    );
};