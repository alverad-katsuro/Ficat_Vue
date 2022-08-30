import re

ficat_dump = open("dump_ficatdb.sql", "r+", encoding="UTF8")
old_dump = open("fichacatalog.sql", "r+", encoding="UTF8")

academic_unities_values = "INSERT INTO `academicUnities`"
courses_values = "INSERT INTO `courses`"
knowledge_areas_values = "INSERT INTO `knowledgeAreas` VALUES"

old_academic_unities_values = "INSERT INTO `academicUnities`"
old_courses_values = "INSERT INTO `courses`"
old_knowledge_areas_values = "INSERT INTO `newareadoconhecimento`"


def get_ka_from_dump(old_dump):
    closed = 1
    ka_array = []

    for line in old_dump.readlines():
        if closed == 0:
            regex = re.compile('[;]') 
            new_line = regex.sub(',', line)

            ka_array.append(new_line)
            # print(new_line.split(",")[1])
            # print(new_line)
            if line[-2] == ";":
                closed = 1
                
            # break
        if old_knowledge_areas_values in line:
            closed = 0
        
    return ka_array


def create_dumpfile(ficat_dump):
    new_dump = open("dump_newficatdb.sql", "w+", encoding="UTF8")

    ka = get_ka_from_dump(old_dump)

    for line in ficat_dump.readlines():
        
        if knowledge_areas_values in line:
            insert_line = knowledge_areas_values + "".join(ka).strip()[:-1] + ";\n"
            new_dump.write(insert_line)
        else:
            new_dump.write(line)



# get_ka_from_dump(old_dump)

create_dumpfile(ficat_dump)