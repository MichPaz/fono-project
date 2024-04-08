def achar_prox_corresp(palavra1, palavra2):
    # print('achar_prox_corresp: '+20*'*')
    # print('palavra1: ', palavra1, ', palavra2: ', palavra2)
    i=0
    i1=0
    i2=0
    while i1<len(palavra1) and i2<len(palavra2):
        letra1=palavra1[i1]
        letra2=palavra2[i2]
        # print('letra1: ', letra1, ', letra2: ', letra2)
        if(letra1==letra2):
            # print('engual', i1, i2)
            return i1, i2
        i += 1
        if(i % 2 == 0):
            i1 += 1
            if(i2>=1):
                i2-=1
        elif(i2+1<len(palavra2)):
            i2 += 1
        # print('i1: ', i1, 'i2: ', i2)

def comparacao(errado, idealizado):
    
    # except_msg="sem correspondencia sintatica entre \""+errado+"\" e \""+idealizado+"\""
    # msg_iteracao=0
    
    blocos = []
    blocos_correspondencia = []
    blocos_ideal = []
    
    blocos.append('')
    blocos_ideal.append('')
    blocos_correspondencia.append(False)
    
    bloco_index = 0
    
    ideal_index = 0
    errado_index = 0
    while errado_index < len(errado):
        # print('_'*30)
        # print('                 bloco_index: ', bloco_index)
        # print('                      blocos: ', blocos)
        # print('                blocos_ideal: ', blocos_ideal)
        # print('      blocos_correspondencia: ', blocos_correspondencia)
        # print('\n')
        # print('                errado_index: ', errado_index)
        # print('                 ideal_index: ', ideal_index)
        # print('\n')
        # print('        errado[errado_index]: ', errado[errado_index])
        # print('     idealizado[ideal_index]: ', idealizado[ideal_index])
        try:
            comp= bool(errado[errado_index]==idealizado[ideal_index])
        except:
            # print(except_msg)
            pass
            
        # print('                        comp: ', comp)
        if(comp):
            if(not blocos_correspondencia[bloco_index] and (bloco_index!=0 and len(blocos)!=1 and blocos[0]!='')):
                # print('UEPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
                # print('add True block')
                blocos.append('')
                blocos_ideal.append('')
                blocos_correspondencia.append(True)
                bloco_index += 1
                # print('UEPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA2')
            blocos[bloco_index] += errado[errado_index]
            try:
                # print('UEPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3')
                blocos_ideal[bloco_index] += idealizado[ideal_index]
                # print('UEPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4')
            except:
                # if(msg_iteracao==0):
                    # print(except_msg)
                pass
            # print('UEPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA5')
            blocos_correspondencia[bloco_index]=True
            # print('UEPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6')
            ideal_index += 1
            # print('UEPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA7')
        else:
            if(blocos_correspondencia[bloco_index]):
                # print('add False block')
                blocos.append('')
                blocos_ideal.append('')
                blocos_correspondencia.append(False)
                bloco_index += 1
            
            prox_corresp =  achar_prox_corresp(errado[errado_index:], idealizado[ideal_index:])
            if(prox_corresp):
                prox_corresp_errado_index, prox_corresp_ideal_index = prox_corresp
                # print("tentando achar proximo corresp: ", prox_corresp_errado_index, prox_corresp_ideal_index)
                errado_comp_false = errado[errado_index:errado_index+prox_corresp_errado_index]
                ideal_comp_false = idealizado[ideal_index:ideal_index+prox_corresp_ideal_index] 
                # print('             errado_comp_false:', errado_comp_false)
                # print('              ideal_comp_false:', ideal_comp_false)
                
                
                
                blocos[bloco_index] += errado_comp_false
                blocos_ideal[bloco_index] += ideal_comp_false
                
                # print('add True block')
                blocos.append('')
                blocos_ideal.append('')
                blocos_correspondencia.append(True)
                bloco_index += 1
                # if(len(errado_comp_false)!=0): #
                errado_index += prox_corresp_errado_index-1
                # else:
                #     errado_index -= 1
                    
                # print('errado_index: ', errado_index)
                ideal_index += prox_corresp_ideal_index
        errado_index += 1
            # else:
                
            
            # blocos[bloco_index] += (errado[letra_index])
            # blocos_ideal[bloco_index] += idealizado[ideal_index]
            # blocos_correspondencia[bloco_index]=False

    return({'blocos_errado': blocos, 'blocos_idealizado': blocos_ideal, 'blocos_correspondencia':blocos_correspondencia})