using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KonyvtarAsztali
{
    class Kolcsonzes
    {
        int id;
        string title;
        string author;
        int publish_year;
        int page_count;
        DateTime start_date;
        DateTime end_date;

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Author { get => author; set => author = value; }
        public int Publish_year { get => publish_year; set => publish_year = value; }
        public int Page_count { get => page_count; set => page_count = value; }
        public DateTime Start_date { get => start_date; set => start_date = value; }
        public DateTime End_date { get => end_date; set => end_date = value; }

        public Kolcsonzes(int id, string title, string author, int publish_year, int page_count, DateTime start_date, DateTime end_date)
        {
            Id = id;
            Title = title;
            Author = author;
            Publish_year = publish_year;
            Page_count = page_count;
            Start_date = start_date;
            End_date = end_date;
        }
    }
}
