// Recetas clásicas propias de la app (ya están en español).
// Para sumar una, tendria que copiar una receta y pegarla aca
// no hay una API al español lamentablemente..
export const CLASICAS = [
  {
    idMeal: 'c1',
    strMeal: 'Empanadas Salteñas',
    emoji: '🥟',
    strCategory: 'Clásica',
    strArea: 'Argentina',
    autor: 'Receta tradicional del norte argentino',
    palabras: ['empanada', 'empanadas', 'carne', 'beef', 'salta', 'argentina', 'horno'],
    ingredientes: [
      '500 g de carne picada o cortada a cuchillo',
      '3 cebollas de verdeo',
      '1 cebolla grande',
      '2 huevos duros',
      '1 cucharadita de comino',
      '1 cucharadita de pimentón',
      '1 docena de tapas de empanadas',
    ],
    strInstructions:
      'Sofreí la cebolla y el verdeo hasta que estén tiernos.\n' +
      'Agregá la carne, el comino y el pimentón y cociná unos minutos. Dejá enfriar.\n' +
      'Sumá los huevos duros picados y mezclá.\n' +
      'Rellená las tapas, cerralas con el repulgue y cociná en horno fuerte unos 20 minutos.',
  },
  {
    idMeal: 'c2',
    strMeal: 'Milanesas a la Napolitana',
    emoji: '🍖',
    strCategory: 'Clásica',
    strArea: 'Argentina',
    autor: 'Clásico de los domingos argentinos',
    palabras: ['milanesa', 'milanesas', 'napolitana', 'carne', 'beef', 'pollo', 'chicken', 'queso'],
    ingredientes: [
      '4 bifes de nalga finos (o pechugas de pollo)',
      '2 huevos',
      'Pan rallado',
      'Ajo y perejil',
      'Salsa de tomate',
      'Jamón y queso mozzarella',
    ],
    strInstructions:
      'Batí los huevos con ajo y perejil.\n' +
      'Pasá los bifes por el huevo y luego por el pan rallado.\n' +
      'Cociná al horno o fritas hasta que estén doradas.\n' +
      'Cubrí con salsa de tomate, jamón y mozzarella y gratiná hasta que se derrita el queso.',
  },
  {
    idMeal: 'c3',
    strMeal: 'Locro Criollo',
    emoji: '🍲',
    strCategory: 'Clásica',
    strArea: 'Argentina',
    autor: 'Plato patrio del 25 de mayo',
    palabras: ['locro', 'guiso', 'maiz', 'zapallo', 'carne', 'beef', 'cerdo', 'pork', 'stew', 'soup', 'sopa'],
    ingredientes: [
      '500 g de maíz blanco (remojado desde la noche anterior)',
      '300 g de porotos',
      '500 g de zapallo',
      '300 g de carne de cerdo',
      '200 g de panceta y chorizo colorado',
      'Cebolla de verdeo para la salsa',
    ],
    strInstructions:
      'Hervi el maíz y los porotos remojados en una olla grande durante 1 hora.\n' +
      'Agregá las carnes y cociná a fuego bajo.\n' +
      'Sumá el zapallo en cubos y cociná hasta que se deshaga y espese.\n' +
      'Serví caliente con salsa de cebolla de verdeo y pimentón.',
  },
  {
    idMeal: 'c4',
    strMeal: 'Alfajores de Maicena',
    emoji: '🍪',
    strCategory: 'Clásica',
    strArea: 'Argentina',
    autor: 'La receta de la abuela',
    palabras: ['alfajor', 'alfajores', 'dulce', 'dulce de leche', 'sweet', 'dessert', 'postre', 'cookie', 'galleta', 'cake'],
    ingredientes: [
      '200 g de maicena',
      '100 g de harina',
      '100 g de manteca',
      '100 g de azúcar',
      '3 yemas',
      '1 cucharadita de polvo de hornear',
      'Dulce de leche y coco rallado',
    ],
    strInstructions:
      'Mezclá la manteca con el azúcar y agregá las yemas.\n' +
      'Sumá la maicena, la harina y el polvo de hornear hasta formar una masa.\n' +
      'Estirá, cortá círculos y horneá a fuego suave 10 minutos.\n' +
      'Dejá enfriar, rellená con dulce de leche y pasá los bordes por coco rallado.',
  },
  {
    idMeal: 'c5',
    strMeal: 'Pollo al Horno con Papas',
    emoji: '🍗',
    strCategory: 'Clásica',
    strArea: 'Argentina',
    autor: 'Almuerzo familiar de todos los días',
    palabras: ['pollo', 'chicken', 'papas', 'papa', 'potato', 'horno', 'baked'],
    ingredientes: [
      '1 pollo trozado',
      '4 papas grandes',
      '2 cebollas',
      '4 dientes de ajo',
      'Romero, sal, pimienta y aceite de oliva',
      'Jugo de 1 limón',
    ],
    strInstructions:
      'Condimentá el pollo con ajo, limón, romero, sal y pimienta.\n' +
      'Colocá en una asadera con las papas y las cebollas cortadas.\n' +
      'Rociá con aceite de oliva.\n' +
      'Horneá a 200 °C durante 1 hora, dándolo vuelta a mitad de cocción.',
  },
  {
    idMeal: 'c6',
    strMeal: 'Pasta con Salsa Bolognesa',
    emoji: '🍝',
    strCategory: 'Clásica',
    strArea: 'Italia',
    autor: 'Clásico italiano adoptado por los argentinos',
    palabras: ['pasta', 'fideos', 'bolognesa', 'bolognese', 'spaghetti', 'tallarines', 'carne', 'beef', 'italian'],
    ingredientes: [
      '500 g de fideos',
      '400 g de carne picada',
      '1 cebolla y 1 zanahoria',
      '2 dientes de ajo',
      '500 g de tomate triturado',
      'Sal, pimienta y orégano',
    ],
    strInstructions:
      'Rehogá la cebolla, la zanahoria y el ajo picados.\n' +
      'Agregá la carne y dorala bien.\n' +
      'Sumá el tomate y los condimentos y cociná a fuego bajo 40 minutos.\n' +
      'Hervi los fideos, escurrilos y serví con la salsa.',
  },
];