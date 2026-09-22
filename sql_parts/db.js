/* Base de datos de ejemplo del curso: la «Librería Esperanza» */
var SQLE_DB_FRESH = function(){
  return {
    tables: {
      autores: {
        cols: ['id','nombre','pais'],
        colDefs: [
          {name:'id',type:'integer',pk:true,notNull:true},
          {name:'nombre',type:'text',notNull:true},
          {name:'pais',type:'text'}
        ],
        rows: [
          [1,'Gabriel García Márquez','Colombia'],
          [2,'Isabel Allende','Chile'],
          [3,'Jorge Luis Borges','Argentina'],
          [4,'Julio Cortázar','Argentina'],
          [5,'Laura Esquivel','México'],
          [6,'Mario Vargas Llosa','Perú'],
          [7,'Elena Poniatowska','México'],
          [8,'Clarice Lispector','Brasil'],
          [9,'Ernesto Sabato','Argentina']
        ]
      },
      libros: {
        cols: ['id','titulo','autor_id','categoria','precio','stock','anio'],
        colDefs: [
          {name:'id',type:'integer',pk:true},
          {name:'titulo',type:'text',notNull:true},
          {name:'autor_id',type:'integer'},
          {name:'categoria',type:'text'},
          {name:'precio',type:'real',check:{f:'cmp',op:'>=',a:{f:'col',name:'precio'},b:{f:'lit',v:0}}},
          {name:'stock',type:'integer',check:{f:'cmp',op:'>=',a:{f:'col',name:'stock'},b:{f:'lit',v:0}}},
          {name:'anio',type:'integer'}
        ],
        rows: [
          [1,'Cien años de soledad',1,'Realismo mágico',320.5,12,1967],
          [2,'El amor en los tiempos del cólera',1,'Romance',280,7,1985],
          [3,'La casa de los espíritus',2,'Realismo mágico',310,9,1982],
          [4,'De amor y de sombras',2,'Novela',250,4,1984],
          [5,'Ficciones',3,'Cuentos',210,15,1944],
          [6,'El Aleph',3,'Cuentos',195.5,0,1949],
          [7,'Rayuela',4,'Novela',340,6,1963],
          [8,'Bestiario',4,'Cuentos',180,11,1951],
          [9,'Como agua para chocolate',5,'Romance',225,8,1989],
          [10,'La ciudad y los perros',6,'Novela',295,10,1963],
          [11,'La casa verde',6,'Novela',270,3,1966],
          [12,'Hasta no verte Jesús mío',7,'Novela',190,5,1969],
          [13,'La hora de la estrella',8,'Novela',165,14,1977],
          [14,'El túnel',9,'Novela',175,2,1948],
          [15,'Paula',2,'Memorias',230,5,1994],
          [16,'Antología poética',3,'Poesía',150,0,null]
        ]
      },
      clientes: {
        cols: ['id','nombre','ciudad','email'],
        colDefs: [
          {name:'id',type:'integer',pk:true},
          {name:'nombre',type:'text',notNull:true},
          {name:'ciudad',type:'text'},
          {name:'email',type:'text',unique:true}
        ],
        rows: [
          [1,'Ana Torres','Ciudad de México','ana.torres@mail.com'],
          [2,'Luis Ramírez','Guadalajara','luis.ramirez@mail.com'],
          [3,'María Fernanda López','Monterrey',null],
          [4,'Carlos Sánchez','Ciudad de México','carlos.s@mail.com'],
          [5,'Lucía Herrera','Mérida',null],
          [6,'Jorge Medina','Puebla','jorge.medina@mail.com'],
          [7,'Sofía Castro','Guadalajara','sofia.castro@mail.com'],
          [8,'Pedro Álvarez','Monterrey',null]
        ]
      },
      ventas: {
        cols: ['id','libro_id','cliente_id','fecha','cantidad','total'],
        colDefs: [
          {name:'id',type:'integer',pk:true},
          {name:'libro_id',type:'integer',notNull:true},
          {name:'cliente_id',type:'integer'},
          {name:'fecha',type:'text',notNull:true},
          {name:'cantidad',type:'integer',notNull:true},
          {name:'total',type:'real',notNull:true}
        ],
        rows: [
          [1,1,1,'2025-01-12',1,320.5],
          [2,5,2,'2025-01-15',2,420],
          [3,9,3,'2025-01-20',1,225],
          [4,6,null,'2025-01-25',1,195.5],
          [5,3,4,'2025-02-02',2,620],
          [6,10,5,'2025-02-08',1,295],
          [7,7,1,'2025-02-14',1,340],
          [8,13,null,'2025-02-18',3,495],
          [9,2,6,'2025-02-22',1,280],
          [10,8,7,'2025-03-01',2,360],
          [11,14,2,'2025-03-05',1,175],
          [12,1,8,'2025-03-09',2,641],
          [13,12,3,'2025-03-15',1,190],
          [14,4,null,'2025-03-20',1,250],
          [15,15,4,'2025-03-28',2,460],
          [16,5,5,'2025-04-03',1,210],
          [17,3,6,'2025-04-10',1,310],
          [18,9,7,'2025-04-15',2,450],
          [19,10,null,'2025-04-21',1,295],
          [20,7,1,'2025-04-26',1,340],
          [21,13,2,'2025-05-04',1,165],
          [22,1,3,'2025-05-10',1,320.5]
        ]
      },
      proveedores: {
        cols: ['id','nombre','contacto'],
        colDefs: [
          {name:'id',type:'integer',pk:true},
          {name:'nombre',type:'text',notNull:true},
          {name:'contacto',type:'text'}
        ],
        rows: [
          [1,'Ediciones del Sur','sur@ediciones.com'],
          [2,'Fondo de Cultura','ventas@fondo.org'],
          [3,'Alfaguara México','pedidos@alfaguara.mx']
        ]
      }
    },
    views: {}
  };
};
if(typeof module!=='undefined') module.exports = SQLE_DB_FRESH;
