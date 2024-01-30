using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KonyvtarAsztali
{
    class Konyv
    {
        int id;
        string title;
        string author;
        int publish_year;
        int page_count;

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Author { get => author; set => author = value; }
        public int Publish_year
        {
            get => publish_year;
            set
            {
                if (value > DateTime.Now.Year)
                {
                    throw new Exception("Jövőbeli évszám");
                }
                else
                {
                    publish_year = value;
                }

            }
        }
        public int Page_count { 
            get => page_count; 
            set  {
                if (value>0)
                {
                    page_count = value;
                }
                else
                {
                    throw new Exception();
                }
            } 
        }

        public Konyv(int id, string title, string author, int publish_year, int page_count)
        {
            Id = id;
            Title = title;
            Author = author;
            Publish_year = publish_year;
            Page_count = page_count;
        }

    }
}
