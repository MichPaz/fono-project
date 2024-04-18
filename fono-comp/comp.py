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

def comparacao(realizado, idealizado):
    
    # except_msg="sem correspondencia sintatica entre \""+realizado+"\" e \""+idealizado+"\""
    # msg_iteracao=0
    
    blocos = []
    blocos_correspondencia = []
    blocos_ideal = []
    
    blocos.append('')
    blocos_ideal.append('')
    blocos_correspondencia.append(False)
    
    bloco_index = 0
    
    ideal_index = 0
    realizado_index = 0
    while realizado_index < len(realizado):
        # print('_'*30)
        # print('                 bloco_index: ', bloco_index)
        # print('                      blocos: ', blocos)
        # print('                blocos_ideal: ', blocos_ideal)
        # print('      blocos_correspondencia: ', blocos_correspondencia)
        # print('\n')
        # print('                realizado_index: ', realizado_index)
        # print('                 ideal_index: ', ideal_index)
        # print('\n')
        # print('        realizado[realizado_index]: ', realizado[realizado_index])
        # print('     idealizado[ideal_index]: ', idealizado[ideal_index])
        try:
            comp= bool(realizado[realizado_index]==idealizado[ideal_index])
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
            blocos[bloco_index] += realizado[realizado_index]
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
            
            prox_corresp =  achar_prox_corresp(realizado[realizado_index:], idealizado[ideal_index:])
            if(prox_corresp):
                prox_corresp_realizado_index, prox_corresp_ideal_index = prox_corresp
                # print("tentando achar proximo corresp: ", prox_corresp_realizado_index, prox_corresp_ideal_index)
                realizado_comp_false = realizado[realizado_index:realizado_index+prox_corresp_realizado_index]
                ideal_comp_false = idealizado[ideal_index:ideal_index+prox_corresp_ideal_index] 
                # print('             realizado_comp_false:', realizado_comp_false)
                # print('              ideal_comp_false:', ideal_comp_false)
                
                
                
                blocos[bloco_index] += realizado_comp_false
                blocos_ideal[bloco_index] += ideal_comp_false
                
                # print('add True block')
                blocos.append('')
                blocos_ideal.append('')
                blocos_correspondencia.append(True)
                bloco_index += 1
                # if(len(realizado_comp_false)!=0): #
                realizado_index += prox_corresp_realizado_index-1
                # else:
                #     realizado_index -= 1
                    
                # print('realizado_index: ', realizado_index)
                ideal_index += prox_corresp_ideal_index
        realizado_index += 1
            # else:
                
            
            # blocos[bloco_index] += (realizado[letra_index])
            # blocos_ideal[bloco_index] += idealizado[ideal_index]
            # blocos_correspondencia[bloco_index]=False

    return({'blocos_realizado': blocos, 'blocos_idealizado': blocos_ideal, 'blocos_correspondencia':blocos_correspondencia})