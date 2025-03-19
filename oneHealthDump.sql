--
-- PostgreSQL database dump
--

-- Dumped from database version 17.3 (Debian 17.3-3.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: status_enum; Type: TYPE; Schema: public; Owner: onehealth
--

CREATE TYPE public.status_enum AS ENUM (
    'active',
    'inactive'
);


ALTER TYPE public.status_enum OWNER TO onehealth;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: drugs; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.drugs (
    drug_id integer NOT NULL,
    name character varying(255)
);


ALTER TABLE public.drugs OWNER TO onehealth;

--
-- Name: drugs_drug_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.drugs_drug_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.drugs_drug_id_seq OWNER TO onehealth;

--
-- Name: drugs_drug_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.drugs_drug_id_seq OWNED BY public.drugs.drug_id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.notifications (
    notification_id integer NOT NULL,
    notification_title character varying(100),
    notification_text character varying(500),
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.notifications OWNER TO onehealth;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.notifications_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_notification_id_seq OWNER TO onehealth;

--
-- Name: notifications_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.notifications_notification_id_seq OWNED BY public.notifications.notification_id;


--
-- Name: redeemed_prizes; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.redeemed_prizes (
    user_id integer NOT NULL,
    reward_id integer NOT NULL,
    redeem_date timestamp without time zone NOT NULL,
    id integer NOT NULL,
    price_at_purchase integer
);


ALTER TABLE public.redeemed_prizes OWNER TO onehealth;

--
-- Name: redeemed_prizes_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.redeemed_prizes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.redeemed_prizes_id_seq OWNER TO onehealth;

--
-- Name: redeemed_prizes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.redeemed_prizes_id_seq OWNED BY public.redeemed_prizes.id;


--
-- Name: rewards; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.rewards (
    id integer NOT NULL,
    name character varying(255),
    points integer,
    status public.status_enum DEFAULT 'active'::public.status_enum,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.rewards OWNER TO onehealth;

--
-- Name: rewards_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.rewards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rewards_id_seq OWNER TO onehealth;

--
-- Name: rewards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.rewards_id_seq OWNED BY public.rewards.id;


--
-- Name: user_drugs; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.user_drugs (
    user_drug_id integer NOT NULL,
    drug_id integer,
    user_id integer,
    dosage character varying(10),
    num_required_daily integer
);


ALTER TABLE public.user_drugs OWNER TO onehealth;

--
-- Name: user_drugs_user_drug_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.user_drugs_user_drug_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_drugs_user_drug_id_seq OWNER TO onehealth;

--
-- Name: user_drugs_user_drug_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.user_drugs_user_drug_id_seq OWNED BY public.user_drugs.user_drug_id;


--
-- Name: user_notifications; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.user_notifications (
    user_notification_id integer NOT NULL,
    user_id integer,
    notification_id integer,
    recieved_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.user_notifications OWNER TO onehealth;

--
-- Name: user_notifications_user_notification_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.user_notifications_user_notification_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_notifications_user_notification_id_seq OWNER TO onehealth;

--
-- Name: user_notifications_user_notification_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.user_notifications_user_notification_id_seq OWNED BY public.user_notifications.user_notification_id;


--
-- Name: user_took_drugs; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.user_took_drugs (
    user_took_drugs_id integer NOT NULL,
    drug_id integer,
    user_id integer,
    took_drug timestamp without time zone
);


ALTER TABLE public.user_took_drugs OWNER TO onehealth;

--
-- Name: user_took_drugs_user_took_drugs_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.user_took_drugs_user_took_drugs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_took_drugs_user_took_drugs_id_seq OWNER TO onehealth;

--
-- Name: user_took_drugs_user_took_drugs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.user_took_drugs_user_took_drugs_id_seq OWNED BY public.user_took_drugs.user_took_drugs_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: onehealth
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(255),
    location character varying(255),
    points integer,
    created_at timestamp without time zone,
    updated_at timestamp without time zone
);


ALTER TABLE public.users OWNER TO onehealth;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: onehealth
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO onehealth;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: onehealth
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: drugs drug_id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.drugs ALTER COLUMN drug_id SET DEFAULT nextval('public.drugs_drug_id_seq'::regclass);


--
-- Name: notifications notification_id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.notifications ALTER COLUMN notification_id SET DEFAULT nextval('public.notifications_notification_id_seq'::regclass);


--
-- Name: redeemed_prizes id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.redeemed_prizes ALTER COLUMN id SET DEFAULT nextval('public.redeemed_prizes_id_seq'::regclass);


--
-- Name: rewards id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.rewards ALTER COLUMN id SET DEFAULT nextval('public.rewards_id_seq'::regclass);


--
-- Name: user_drugs user_drug_id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_drugs ALTER COLUMN user_drug_id SET DEFAULT nextval('public.user_drugs_user_drug_id_seq'::regclass);


--
-- Name: user_notifications user_notification_id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_notifications ALTER COLUMN user_notification_id SET DEFAULT nextval('public.user_notifications_user_notification_id_seq'::regclass);


--
-- Name: user_took_drugs user_took_drugs_id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_took_drugs ALTER COLUMN user_took_drugs_id SET DEFAULT nextval('public.user_took_drugs_user_took_drugs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: drugs; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.drugs (drug_id, name) FROM stdin;
1	Tylenol
2	Venlafaxine
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.notifications (notification_id, notification_title, notification_text, created_at) FROM stdin;
1	TEST	This is a test	2025-02-07 13:24:31.232766-07
2	Your medication is due for a refill	Your medication [med name] is due for a refill! Be sure to refill it at your pharmacy of choice before your next dose on [date].	2025-02-07 13:32:10.891663-07
4	New study released about your medication	Your medication [med name] has a new study on it! Read the results here [link]	2025-02-07 13:32:10.891663-07
5	Password has been reset	You password was reset successfully on [date]. If this was NOT you, please reset your password immediately, or contact [email/number] right away! If this WAS you that changed your password, you may ignore this message.	2025-02-07 13:32:10.891663-07
6	Welcome to OneHealth!	We want to thank you for putting your health first and signing up for OneHealth! We can't wait for you to be able to start earning rewards and seeing the benefits of taking care of yourself; you deserve it!	2025-02-07 13:32:10.891663-07
3	Don't forget to log when you take your medication!	Logging when you take your medication will help you gain rewards, and help your doctor know that you've taken your medications.	2025-02-07 13:32:10.891663-07
\.


--
-- Data for Name: redeemed_prizes; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.redeemed_prizes (user_id, reward_id, redeem_date, id, price_at_purchase) FROM stdin;
2	1	2025-01-17 00:57:42.952817	1	20
5	1	2025-01-17 15:48:48.88569	4	20
8	1	2025-01-17 15:49:18.280437	6	20
2	1	2025-01-17 16:00:31.237877	8	20
2	1	2025-01-17 16:49:34.000432	11	20
8	1	2025-01-17 10:10:08.144254	12	20
26	1	2025-01-17 10:11:59.751337	13	20
2	1	2025-01-20 14:15:32.888428	15	20
4	1	2025-01-21 15:42:16.594656	17	20
28	1	2025-01-21 16:27:01.436059	18	20
29	1	2025-01-22 10:55:52.818188	20	20
2	1	2025-01-22 11:01:24.445546	22	20
2	1	2025-01-22 11:01:25.440607	23	20
2	1	2025-01-22 11:02:14.205877	25	20
2	1	2025-01-25 12:55:04.549338	30	20
2	1	2025-01-28 16:44:39.72405	33	20
2	1	2025-01-28 17:12:58.9982	34	20
39	1	2025-01-28 20:25:56.417434	37	20
38	1	2025-01-28 20:26:20.967318	38	20
5	1	2025-01-28 20:55:39.507637	39	20
3	1	2025-01-28 21:00:17.089591	40	20
4	1	2025-01-28 21:02:07.243502	41	20
40	1	2025-01-29 20:14:07.457853	45	20
6	1	2025-01-29 20:44:16.052028	49	20
2	2	2025-01-17 00:57:42.952817	2	30
3	2	2025-01-17 15:33:57.389544	3	30
5	2	2025-01-17 15:48:52.967272	5	30
2	2	2025-01-17 16:00:17.199322	7	30
2	2	2025-01-17 16:13:24.588076	9	30
2	2	2025-01-17 16:46:02.302081	10	30
2	2	2025-01-17 10:16:03.563057	14	30
8	2	2025-01-20 17:35:25.794906	16	30
28	2	2025-01-21 21:30:53.120327	19	30
29	2	2025-01-22 10:56:07.282778	21	30
2	2	2025-01-22 11:01:54.83321	24	30
2	2	2025-01-22 13:57:17.35884	26	30
29	2	2025-01-23 19:43:09.541298	27	30
2	2	2025-01-23 21:31:59.422708	28	30
3	2	2025-01-23 21:49:43.957184	29	30
2	2	2025-01-25 14:16:28.640997	31	30
2	2	2025-01-25 17:27:44.053137	32	30
2	2	2025-01-28 17:13:09.265317	35	30
2	2	2025-01-28 20:13:00.794922	36	30
40	2	2025-01-29 20:06:05.859747	43	30
40	2	2025-01-29 20:41:16.150736	48	30
6	2	2025-01-29 20:44:28.918642	50	30
40	3	2025-01-29 19:17:57.119956	42	100
40	3	2025-01-29 20:07:20.21409	44	100
40	3	2025-01-29 20:40:49.06299	46	100
40	3	2025-01-29 20:40:51.62659	47	100
3	5	2025-01-30 18:24:36.409831	53	10
7	5	2025-01-30 18:44:51.614599	54	10
7	7	2025-01-30 18:45:00.757298	55	15
2	7	2025-01-30 20:37:41.935069	56	15
2	7	2025-01-30 20:37:44.318209	57	15
2	7	2025-01-30 20:37:54.389118	58	15
2	7	2025-01-30 20:37:55.115387	59	15
2	1	2025-01-30 20:38:18.95047	60	20
2	7	2025-01-30 20:38:38.338354	61	15
2	7	2025-01-30 20:39:34.369614	62	15
2	1	2025-01-30 20:39:51.892923	63	20
2	7	2025-01-30 20:40:07.982798	64	15
2	7	2025-01-30 20:40:09.297139	65	15
2	7	2025-01-30 20:40:10.233687	66	15
2	7	2025-01-30 20:40:41.48839	67	15
2	7	2025-01-30 20:40:42.615245	68	15
4	7	2025-01-30 20:40:59.702457	69	15
39	7	2025-01-30 20:43:18.704737	70	15
39	7	2025-01-30 20:43:19.366836	71	15
37	1	2025-01-31 10:25:09.500587	72	20
6	1	2025-01-31 10:44:14.814981	73	20
2	1	2025-01-31 11:33:19.659627	74	20
2	1	2025-01-31 11:54:47.254652	75	20
2	1	2025-01-31 11:54:48.939927	76	20
2	1	2025-01-31 11:55:08.885762	77	20
2	1	2025-01-31 11:55:56.380929	78	20
2	1	2025-01-31 11:56:51.826611	79	20
5	2	2025-01-31 15:30:17.087938	80	30
37	2	2025-01-31 16:15:04.035136	81	30
37	2	2025-01-31 16:15:15.934428	82	30
37	2	2025-01-31 16:15:16.511756	83	30
37	2	2025-01-31 16:15:17.06365	84	30
37	2	2025-01-31 16:15:17.543222	85	30
37	2	2025-01-31 16:15:17.980063	86	30
37	2	2025-01-31 16:15:18.464628	87	30
37	2	2025-01-31 16:15:18.92909	88	30
37	2	2025-01-31 16:15:31.355701	89	30
37	2	2025-01-31 16:15:31.772169	90	30
37	2	2025-01-31 16:15:32.208574	91	30
37	2	2025-01-31 16:15:32.663136	92	30
37	2	2025-01-31 16:15:33.229501	93	30
37	2	2025-01-31 16:15:33.726948	94	30
37	2	2025-01-31 16:15:40.25004	95	30
37	2	2025-01-31 16:15:40.475678	96	30
37	2	2025-01-31 16:15:40.673395	97	30
37	2	2025-01-31 16:15:40.891136	98	30
37	2	2025-01-31 16:15:41.093076	99	30
37	2	2025-01-31 16:15:41.278614	100	30
2	1	2025-01-31 17:02:04.361789	101	20
30	2	2025-02-03 17:51:07.577297	102	30
30	1	2025-02-03 17:51:10.258215	103	20
30	1	2025-02-03 17:51:10.686891	104	20
3	1	2025-02-03 18:15:34.999017	105	20
3	1	2025-02-03 18:15:38.397642	106	20
3	1	2025-02-03 18:15:56.474976	107	20
4	1	2025-02-03 18:56:22.045691	108	20
4	8	2025-02-03 18:56:24.537216	109	150
4	7	2025-02-04 17:43:07.501697	110	20
4	7	2025-02-04 17:43:08.088343	111	20
4	7	2025-02-04 17:43:08.619747	112	20
3	15	2025-02-05 19:08:13.726839	113	10
3	15	2025-02-05 19:08:14.329249	114	10
3	2	2025-02-06 19:28:04.843976	135	35
46	17	2025-02-06 19:58:53.491816	136	110
3	5	2025-02-06 20:04:33.322309	137	10
3	5	2025-02-06 20:04:34.349909	138	10
3	5	2025-02-06 20:04:35.284594	139	10
3	5	2025-02-06 20:04:40.81841	140	10
26	5	2025-02-06 20:09:11.961219	141	10
26	2	2025-02-06 20:09:26.581744	142	35
26	2	2025-02-06 20:09:29.091849	143	35
3	12	2025-02-07 21:26:56.060331	144	110
3	15	2025-02-07 21:27:15.142163	145	10
3	15	2025-02-07 21:27:31.415217	146	10
3	2	2025-02-11 11:30:01.437257	147	35
4	5	2025-02-11 16:47:34.862733	148	10
2	5	2025-02-11 18:04:09.374053	149	10
2	5	2025-02-11 18:47:49.744646	150	10
2	2	2025-02-13 15:22:31.021112	151	35
3	2	2025-02-13 15:25:26.309928	152	35
3	2	2025-02-13 15:25:38.066583	153	35
3	2	2025-02-13 15:26:50.099158	154	35
3	5	2025-02-13 15:27:07.140954	155	10
3	5	2025-02-13 15:27:09.789327	156	10
3	5	2025-02-13 15:27:10.590289	157	10
3	5	2025-02-13 15:27:11.604413	158	10
3	5	2025-02-13 15:34:02.200731	159	10
3	5	2025-02-13 15:34:03.003981	160	10
3	5	2025-02-13 15:34:03.582984	161	10
3	5	2025-02-13 15:34:04.115854	162	10
3	2	2025-02-13 15:34:28.889107	163	35
3	2	2025-02-13 15:34:39.370572	164	35
3	5	2025-02-13 15:35:08.854862	165	10
3	5	2025-02-13 15:35:18.189938	166	10
3	5	2025-02-13 15:35:56.139598	167	10
3	5	2025-02-13 15:36:02.088151	168	10
3	2	2025-02-13 15:36:04.849292	169	35
3	5	2025-02-13 15:36:07.639882	170	10
3	5	2025-02-13 15:36:08.374038	171	10
2	2	2025-02-13 15:36:25.352792	172	35
2	2	2025-02-13 15:36:55.584292	173	35
2	2	2025-02-13 15:37:05.023803	174	35
2	5	2025-02-13 15:37:36.282767	175	10
2	5	2025-02-13 15:37:52.054627	176	10
2	5	2025-02-13 15:54:36.654093	177	10
2	5	2025-02-13 15:55:49.667366	178	10
2	5	2025-02-13 15:55:56.485882	179	10
2	5	2025-02-13 15:57:22.999504	180	10
3	2	2025-02-13 16:08:38.003967	181	35
3	2	2025-02-13 16:08:38.754358	182	35
2	5	2025-02-13 16:09:41.40814	183	10
2	5	2025-02-13 16:09:46.357533	184	10
2	5	2025-02-13 16:09:47.106494	185	10
2	5	2025-02-13 16:09:57.9812	186	10
2	5	2025-02-13 16:09:58.82288	187	10
2	5	2025-02-13 16:09:59.492316	188	10
2	5	2025-02-13 16:10:08.313011	189	10
2	5	2025-02-13 16:10:08.936237	190	10
2	5	2025-02-13 16:36:54.361432	191	10
2	5	2025-02-13 16:37:04.198549	192	10
2	5	2025-02-13 16:37:59.645876	193	10
2	5	2025-02-13 16:38:02.96168	194	10
2	5	2025-02-13 16:38:05.065143	195	10
2	5	2025-02-13 16:38:17.89085	196	10
2	5	2025-02-13 16:38:20.025936	197	10
2	5	2025-02-13 16:38:27.915068	198	10
2	5	2025-02-13 16:38:28.608785	199	10
26	5	2025-02-13 16:43:31.171422	200	10
26	5	2025-02-13 16:43:43.502651	201	10
26	5	2025-02-13 16:43:44.328254	202	10
26	5	2025-02-13 16:43:45.311435	203	10
4	2	2025-02-13 16:46:28.632788	204	35
4	5	2025-02-13 16:47:11.331591	205	10
3	5	2025-02-13 16:49:02.380472	206	10
3	5	2025-02-13 16:49:03.405652	207	10
3	5	2025-02-13 16:49:11.251569	208	10
2	5	2025-02-13 16:55:31.917007	209	10
2	5	2025-02-13 16:55:32.938905	210	10
3	5	2025-02-13 16:55:47.014875	211	10
4	5	2025-02-13 16:56:01.593008	212	10
4	5	2025-02-13 16:56:03.458192	213	10
5	5	2025-02-13 16:56:17.407879	214	10
8	5	2025-02-13 17:07:21.925885	215	10
8	5	2025-02-13 17:07:23.201409	216	10
8	5	2025-02-13 17:07:23.68481	217	10
8	5	2025-02-13 17:07:23.9184	218	10
8	5	2025-02-13 17:07:24.152548	219	10
8	5	2025-02-13 17:08:06.654869	220	10
8	5	2025-02-13 17:08:07.181165	221	10
45	5	2025-02-13 17:13:12.840782	222	10
45	5	2025-02-13 17:13:24.447954	223	10
45	5	2025-02-13 17:13:25.169068	224	10
28	5	2025-02-13 17:14:07.888737	225	10
28	5	2025-02-13 17:14:08.579174	226	10
28	5	2025-02-13 17:14:09.164215	227	10
28	5	2025-02-13 17:14:09.612012	228	10
28	5	2025-02-13 17:15:41.014753	229	10
2	5	2025-02-13 17:26:59.253233	230	10
2	5	2025-02-13 17:26:59.933807	231	10
2	5	2025-02-13 17:27:00.30815	232	10
2	5	2025-02-13 17:27:00.539036	233	10
2	5	2025-02-13 17:27:00.757393	234	10
2	5	2025-02-13 17:27:00.990584	235	10
2	5	2025-02-13 17:27:01.185868	236	10
2	5	2025-02-13 17:27:01.457597	237	10
2	5	2025-02-13 17:28:13.399154	238	10
2	5	2025-02-13 17:28:14.441173	239	10
2	5	2025-02-13 17:28:14.652217	240	10
2	5	2025-02-13 17:28:14.840373	241	10
34	5	2025-02-13 17:30:47.462243	242	10
34	5	2025-02-13 17:30:48.270451	243	10
5	5	2025-02-13 17:44:22.663491	244	10
5	5	2025-02-13 17:44:23.336898	245	10
5	5	2025-02-13 17:44:23.951294	246	10
5	5	2025-02-13 17:44:24.153936	247	10
36	5	2025-02-13 17:54:17.951364	248	10
36	5	2025-02-13 17:54:18.726291	249	10
36	5	2025-02-13 17:54:18.876912	250	10
36	5	2025-02-13 17:54:19.043124	251	10
36	5	2025-02-13 17:54:19.210821	252	10
36	5	2025-02-13 17:55:40.31091	253	10
3	5	2025-02-13 18:52:29.680392	254	10
3	5	2025-02-13 18:52:33.942868	255	10
3	5	2025-02-13 18:52:34.141228	256	10
3	5	2025-02-13 18:52:34.389754	257	10
6	7	2025-02-13 19:42:04.507854	258	20
2	7	2025-02-13 19:43:59.285045	259	20
2	7	2025-02-13 19:43:59.983242	260	20
3	5	2025-02-13 19:47:13.930205	261	10
3	7	2025-02-13 19:47:14.937573	262	20
3	5	2025-02-13 19:47:16.219336	263	10
5	7	2025-02-13 20:04:51.801917	264	20
5	7	2025-02-13 20:04:52.266289	265	20
2	5	2025-02-17 14:53:20.826919	266	10
2	5	2025-02-17 14:54:02.423844	267	10
2	5	2025-02-17 15:09:09.235391	268	10
2	5	2025-02-17 21:10:26.39298	269	10
8	5	2025-02-17 21:13:44.441337	270	10
8	5	2025-02-17 21:13:54.661559	271	10
27	5	2025-02-17 21:20:32.242013	272	10
27	5	2025-02-17 21:20:33.245836	273	10
2	7	2025-02-19 20:52:37.819601	274	20
2	7	2025-02-24 13:39:57.233239	275	20
\.


--
-- Data for Name: rewards; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.rewards (id, name, points, status, created_at, updated_at) FROM stdin;
20	planting pot	105	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
15	colored pencils	10	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
8	Phone Case	150	active	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
19	mtn. dew	100	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
7	Key Chain	20	active	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
16	backpack	300	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
2	Amazon Gift Card	35	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
1	Target Gift Card	30	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
5	Candy Bar	10	active	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
9	Journal	205	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
11	basketball	100	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
14	picture frame	150	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
21	hydro flask	150	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
13	pickleball	250	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
12	golf ball	110	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
17	fruit snacks	110	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
18	stanley water bottle	250	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:35:38.673791
3	Free Coffee	100	inactive	2025-02-19 20:35:38.673791	2025-02-19 20:46:07.305142
\.


--
-- Data for Name: user_drugs; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.user_drugs (user_drug_id, drug_id, user_id, dosage, num_required_daily) FROM stdin;
1	1	2	25mg	2
2	2	2	75mg	1
3	2	3	50mg	2
4	2	4	100mg	1
\.


--
-- Data for Name: user_notifications; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.user_notifications (user_notification_id, user_id, notification_id, recieved_at) FROM stdin;
1	2	6	2025-02-07 16:10:30.737402-07
2	2	5	2025-02-07 20:51:08.454922-07
3	3	2	2025-02-07 20:51:08.454922-07
4	4	6	2025-02-07 20:51:08.454922-07
5	5	5	2025-02-07 20:51:08.454922-07
6	6	5	2025-02-07 20:51:08.454922-07
7	7	3	2025-02-07 20:51:08.454922-07
8	8	1	2025-02-07 20:51:08.454922-07
9	24	2	2025-02-07 20:51:08.454922-07
10	26	2	2025-02-07 20:51:08.454922-07
11	27	2	2025-02-07 20:51:08.454922-07
12	28	5	2025-02-07 20:51:08.454922-07
13	29	4	2025-02-07 20:51:08.454922-07
14	30	3	2025-02-07 20:51:08.454922-07
15	31	3	2025-02-07 20:51:08.454922-07
16	32	2	2025-02-07 20:51:08.454922-07
17	33	3	2025-02-07 20:51:08.454922-07
18	34	2	2025-02-07 20:51:08.454922-07
19	35	2	2025-02-07 20:51:08.454922-07
20	36	4	2025-02-07 20:51:08.454922-07
21	37	4	2025-02-07 20:51:08.454922-07
22	38	6	2025-02-07 20:51:08.454922-07
23	39	4	2025-02-07 20:51:08.454922-07
24	40	5	2025-02-07 20:51:08.454922-07
25	45	5	2025-02-07 20:51:08.454922-07
26	46	3	2025-02-07 20:51:08.454922-07
27	2	1	2025-02-07 21:41:45.71432-07
28	3	1	2025-02-07 21:43:20.987172-07
29	8	5	2025-02-07 21:48:21.242033-07
30	8	5	2025-02-07 21:48:22.573037-07
31	8	3	2025-02-07 21:51:03.077701-07
32	8	5	2025-02-07 21:51:40.220138-07
33	4	2	2025-02-07 21:51:57.242353-07
34	2	3	2025-02-10 11:42:03.665276-07
35	2	1	2025-02-13 16:39:48.874023-07
36	2	1	2025-02-13 16:39:53.053564-07
37	2	3	2025-02-13 16:39:56.039026-07
38	2	3	2025-02-13 16:39:59.936327-07
39	2	2	2025-02-13 16:40:03.671828-07
40	2	3	2025-02-13 16:42:08.407482-07
41	2	4	2025-02-13 16:42:19.484795-07
42	26	5	2025-02-13 16:42:49.190324-07
43	26	6	2025-02-13 16:42:52.621331-07
44	3	5	2025-02-13 18:52:00.53947-07
45	3	5	2025-02-15 20:53:09.967443-07
46	3	1	2025-02-15 20:53:19.519045-07
47	3	3	2025-02-15 20:54:05.78559-07
48	3	5	2025-02-15 20:55:41.136328-07
49	3	2	2025-02-15 20:55:45.019508-07
50	45	6	2025-02-15 21:00:37.387717-07
51	45	3	2025-02-15 21:00:44.323492-07
52	45	4	2025-02-15 21:00:49.822535-07
53	45	4	2025-02-15 21:01:04.872105-07
54	45	4	2025-02-15 21:01:11.205712-07
55	3	5	2025-02-15 21:01:55.068604-07
56	3	4	2025-02-15 21:06:04.781538-07
57	3	5	2025-02-15 21:07:02.053327-07
58	3	6	2025-02-15 21:10:23.24286-07
59	40	3	2025-02-15 21:13:02.047393-07
60	40	6	2025-02-15 21:13:05.760844-07
61	40	1	2025-02-15 21:13:16.075241-07
62	40	2	2025-02-15 21:13:17.776731-07
63	40	1	2025-02-15 21:13:19.393505-07
64	40	6	2025-02-15 21:13:24.028728-07
65	40	3	2025-02-15 21:16:27.306234-07
66	40	1	2025-02-15 21:16:30.758543-07
67	40	6	2025-02-15 21:23:01.227479-07
68	40	4	2025-02-15 21:23:06.724918-07
69	40	1	2025-02-15 21:23:17.049802-07
70	40	3	2025-02-15 21:23:44.882892-07
71	40	2	2025-02-15 21:24:06.434017-07
72	3	6	2025-02-15 21:25:45.235206-07
73	3	3	2025-02-15 21:25:53.567698-07
74	8	5	2025-02-17 21:12:43.493719-07
75	27	5	2025-02-17 21:16:41.242832-07
76	27	2	2025-02-17 21:17:23.882009-07
77	2	5	2025-02-24 14:18:46.703111-07
78	2	6	2025-02-24 18:31:22.878069-07
79	2	4	2025-02-24 18:31:31.989162-07
80	2	5	2025-02-24 18:31:48.067115-07
81	4	1	2025-02-24 18:34:02.870608-07
82	2	5	2025-02-26 17:13:48.660571-07
83	2	4	2025-02-26 17:13:52.447808-07
84	4	2	2025-02-26 18:45:12.962079-07
85	2	5	2025-02-26 20:10:23.351835-07
86	4	1	2025-02-27 15:09:40.892546-07
\.


--
-- Data for Name: user_took_drugs; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.user_took_drugs (user_took_drugs_id, drug_id, user_id, took_drug) FROM stdin;
4	1	2	2025-02-17 13:57:02.555607
5	1	2	2025-02-17 13:57:10.191728
6	1	2	2025-02-17 13:57:35.482807
7	1	2	2025-02-17 14:39:47.644254
8	1	2	2025-02-17 14:41:10.856304
9	1	2	2025-02-17 14:41:24.436383
10	1	2	2025-02-17 14:50:51.500604
11	1	2	2025-02-17 14:52:47.375432
12	1	2	2025-02-17 15:07:19.536702
13	1	2	2025-02-17 19:28:20.784218
14	1	2	2025-02-17 21:10:14.289481
15	1	2	2025-02-18 21:54:19.213387
16	1	2	2025-02-19 11:44:22.182701
17	1	2	2025-02-19 20:10:57.754985
18	2	2	2025-02-20 16:57:04.425993
19	1	2	2025-02-20 16:58:16.593211
20	1	2	2025-02-20 17:55:33.614397
21	2	2	2025-02-20 17:55:39.516993
22	2	3	2025-02-20 20:59:02.49011
23	2	2	2025-02-20 21:01:19.437215
24	2	3	2025-02-20 21:01:46.006679
25	1	2	2025-02-21 15:10:09.96914
26	2	2	2025-02-21 15:10:15.084939
27	2	3	2025-02-21 15:13:17.426509
28	1	2	2025-02-21 16:48:56.319535
29	1	2	2025-02-21 16:49:08.866081
30	2	2	2025-02-21 16:54:00.815463
31	2	2	2025-02-21 16:54:05.36498
32	1	2	2025-02-24 11:02:53.335146
33	1	2	2025-02-24 11:03:00.466051
34	2	2	2025-02-24 11:03:04.803787
35	2	3	2025-02-24 12:02:00.644899
39	2	3	2025-02-24 12:52:15.269108
40	2	4	2025-02-24 12:55:36.944181
41	2	2	2025-02-25 17:23:22.998169
42	1	2	2025-02-25 17:24:49.901511
43	1	2	2025-02-25 19:00:44.647198
44	2	3	2025-02-25 19:02:59.229952
45	1	2	2025-02-26 17:26:59.632205
46	2	3	2025-02-26 17:32:58.136952
47	2	2	2025-02-26 19:35:01.616477
48	2	4	2025-02-26 20:28:39.174402
49	1	2	2025-02-26 22:29:02.666375
50	2	3	2025-02-26 22:29:49.597823
51	1	2	2025-02-27 09:05:03.892912
52	2	3	2025-02-27 09:05:46.829129
53	2	4	2025-02-27 10:07:11.339758
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: onehealth
--

COPY public.users (id, name, location, points, created_at, updated_at) FROM stdin;
35	Scott	Mesa	100	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
26	Frank	Atlanta	25	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
58	spencer	tallahassee	30	2025-02-19 20:54:58.680615	2025-02-19 20:54:58.680615
30	Scott	Virgina	0	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
4	Alex	Detroit	15	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
8	Billy	Carmel	0	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
34	Elton	UK	15	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
27	Richard	Georgia	40	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
7	Josh	Jackson Hole	15	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
38	Kyle	Rexburg	5	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
36	Gregorio	Kansas	40	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
29	Charlie	Minnesota	30	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
24	Marsha	Washington	70	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
6	Rick	Henderson	25	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
45	isabell	austin	5	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
31	Bob 	Kentucky	5	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
32	Gary	Kimberly	15	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
33	Terry	San Francisco	30	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
28	Larry	Georgia	40	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
40	Jerimiah	New York	20	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
3	charles	Boston	30	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
5	Fox Pest 	New Hampshire	0	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
46	bradley	bakersfield	0	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
37	Andrue	Pocatello	25	2025-02-10 00:00:00	2025-02-19 20:20:45.075334
39	Steve	New Zealand	50	2025-02-10 00:00:00	2025-02-19 20:46:34.927785
2	Lucy	Wisconsin	50	2025-02-10 00:00:00	2025-02-27 10:08:52.25185
\.


--
-- Name: drugs_drug_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.drugs_drug_id_seq', 2, true);


--
-- Name: notifications_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.notifications_notification_id_seq', 6, true);


--
-- Name: redeemed_prizes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.redeemed_prizes_id_seq', 275, true);


--
-- Name: rewards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.rewards_id_seq', 21, true);


--
-- Name: user_drugs_user_drug_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.user_drugs_user_drug_id_seq', 4, true);


--
-- Name: user_notifications_user_notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.user_notifications_user_notification_id_seq', 86, true);


--
-- Name: user_took_drugs_user_took_drugs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.user_took_drugs_user_took_drugs_id_seq', 53, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: onehealth
--

SELECT pg_catalog.setval('public.users_id_seq', 58, true);


--
-- Name: drugs drugs_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.drugs
    ADD CONSTRAINT drugs_pkey PRIMARY KEY (drug_id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (notification_id);


--
-- Name: redeemed_prizes redeemed_prizes_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.redeemed_prizes
    ADD CONSTRAINT redeemed_prizes_pkey PRIMARY KEY (id);


--
-- Name: rewards rewards_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (id);


--
-- Name: user_drugs user_drugs_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_drugs
    ADD CONSTRAINT user_drugs_pkey PRIMARY KEY (user_drug_id);


--
-- Name: user_notifications user_notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_notifications
    ADD CONSTRAINT user_notifications_pkey PRIMARY KEY (user_notification_id);


--
-- Name: user_took_drugs user_took_drugs_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_took_drugs
    ADD CONSTRAINT user_took_drugs_pkey PRIMARY KEY (user_took_drugs_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: user_drugs fk_drug; Type: FK CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_drugs
    ADD CONSTRAINT fk_drug FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- Name: user_took_drugs fk_drug; Type: FK CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_took_drugs
    ADD CONSTRAINT fk_drug FOREIGN KEY (drug_id) REFERENCES public.drugs(drug_id);


--
-- Name: user_drugs fk_user; Type: FK CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_drugs
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: user_took_drugs fk_user; Type: FK CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.user_took_drugs
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: redeemed_prizes redeemed_prizes_reward_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.redeemed_prizes
    ADD CONSTRAINT redeemed_prizes_reward_id_fkey FOREIGN KEY (reward_id) REFERENCES public.rewards(id);


--
-- Name: redeemed_prizes redeemed_prizes_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: onehealth
--

ALTER TABLE ONLY public.redeemed_prizes
    ADD CONSTRAINT redeemed_prizes_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

