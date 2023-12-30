using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MySql.Data.MySqlClient;


namespace KonyvtarAsztali
{
    class Program
    {
        static List<Konyv> konyvek = new List<Konyv>();
        static List<Kolcsonzes> kolcsonzesek = new List<Kolcsonzes>();
        static void Main(string[] args)
        {
            adatokBeolvasasa();
            hosszabbmint500();
            regebbiMint1950();
            leghosszabbKonyv();
            legtobbKonyv();
            int db = hanydarab();
            if (db>0)
            {
                Console.WriteLine($"Az megadott könyv {db}x lett kikölcsönözve");
            }
            else
            {
                Console.WriteLine("Nincs ilyen könyv");
            }
            Console.WriteLine("\nProgram vége!");
            Console.ReadLine();
        }

        private static int hanydarab()
        {
            Console.Write("Adjon meg egy könyv címet: ");
            string cim = Console.ReadLine();
            return kolcsonzesek.FindAll(a => a.Title.Equals(cim)).Count();
        }

        private static void legtobbKonyv()
        {
            var szerzo = konyvek.GroupBy(a => a.Author).Select(b => new { szerzo = b.Key, db = b.Count() }).OrderByDescending(c => c.db).First().szerzo;
            Console.WriteLine($"A legtöbb könyvvel rendelkező szerző: {szerzo}");
        }

        private static void leghosszabbKonyv()
        {
            Console.WriteLine("A leghosszabb könyv:");
            int maxOldal = konyvek.Max(a => a.Page_count);
            foreach (Konyv item in konyvek.FindAll(a => a.Page_count==maxOldal))
            {
                Console.WriteLine($"\n\tSzerző: {item.Author}");
                Console.WriteLine($"\tCím: {item.Title}");
                Console.WriteLine($"\tKiadás éve: {item.Publish_year}");
                Console.WriteLine($"\tOldalszám: {item.Page_count}");
            }
        }

        private static void regebbiMint1950()
        {
            var regebbi = konyvek.Find(a => a.Publish_year < 1950);
            if (regebbi==null)
            {
                Console.WriteLine("Nincs 1950-nél régebbi könyv");
            }
            else
            {
                Console.WriteLine("Van 1950-nél régebbi könyv");
            }
        }

        private static void hosszabbmint500()
        {
            int db = konyvek.FindAll(a => a.Page_count > 500).Count;
            Console.WriteLine($"500 oldalnál hosszabb könyvek száma: {db}");
        }

        private static void adatokBeolvasasa()
        {
            Console.WriteLine("Adatok beolvasása...");
            MySqlConnectionStringBuilder sb = new MySqlConnectionStringBuilder();
            sb.Server = "localhost";
            sb.UserID = "root";
            sb.Password = "";
            sb.Database = "vizsga_books";
            sb.CharacterSet = "UTF8";
            MySqlConnection connection = new MySqlConnection(sb.ConnectionString);
            try
            {
                connection.Open();
                MySqlCommand command = connection.CreateCommand();
                //-- Könyvek adatainak a beolvasása -------
                command.CommandText = "SELECT `id`,`title`,`author`,`publish_year`,`page_count` FROM `books` WHERE 1";
                using (MySqlDataReader dr = command.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Konyv uj = new Konyv(dr.GetInt32("id"), dr.GetString("title"), dr.GetString("author"), dr.GetInt32("publish_year"), dr.GetInt32("page_count"));
                        konyvek.Add(uj);
                    }
                }
                //-- Kölcsönzések adatainak a beolvasása ------
                command.CommandText = "SELECT * FROM books  JOIN rentals ON books.id=rentals.book_id;";
                using (MySqlDataReader dr = command.ExecuteReader())
                {
                    while (dr.Read())
                    {
                        Kolcsonzes uj = new Kolcsonzes(dr.GetInt32("id"), dr.GetString("title"), dr.GetString("author"), dr.GetInt32("publish_year"), dr.GetInt32("page_count"), dr.GetDateTime("start_date"), dr.GetDateTime("end_date"));
                        kolcsonzesek.Add(uj);
                    }
                }
            }
            catch (MySqlException ex)
            {

                Console.WriteLine(ex.Message);
                Environment.Exit(0);
            }
            Console.WriteLine($"{konyvek.Count} rekord beolvasása megtörtént.");
        }
    }
}
